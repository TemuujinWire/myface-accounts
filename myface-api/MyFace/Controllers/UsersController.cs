using System;
using System.Text;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using MyFace.Helpers;
using MyFace.Models.Request;
using MyFace.Models.Response;
using MyFace.Repositories;

namespace MyFace.Controllers
{
    [ApiController]
    [Route("/users")]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepo _users;

        public UsersController(IUsersRepo users)
        {
            _users = users;
        }
        
        [HttpGet("")]
        public ActionResult<UserListResponse> Search([FromQuery] UserSearchRequest searchRequest)
        {
            
            string authorizationString = Request.Headers["Authorization"];
            byte[] decodedData = Convert.FromBase64String(authorizationString.Substring(5));
            
            string[] usernamePassword = Encoding.UTF8.GetString(decodedData).Split(':');
            string decodedUsername = usernamePassword[0];
            string decodedPassword = usernamePassword[1];

            var user = _users.GetByUsername(decodedUsername);
            
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: decodedPassword,
                salt: user.Salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));

            Console.WriteLine(hashed == user.HashedPassword);
            
            var users = _users.Search(searchRequest);
            var userCount = _users.Count(searchRequest);
            return UserListResponse.Create(searchRequest, users, userCount);
        }

        [HttpGet("{id}")]
        public ActionResult<UserResponse> GetById([FromRoute] int id)
        {
            var user = _users.GetById(id);
            return new UserResponse(user);
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] CreateUserRequest newUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var user = _users.Create(newUser);

            var url = Url.Action("GetById", new { id = user.Id });
            var responseViewModel = new UserResponse(user);
            return Created(url, responseViewModel);
        }

        [HttpPatch("{id}/update")]
        public ActionResult<UserResponse> Update([FromRoute] int id, [FromBody] UpdateUserRequest update)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _users.Update(id, update);
            return new UserResponse(user);
        }
        
        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            _users.Delete(id);
            return Ok();
        }
    }
}
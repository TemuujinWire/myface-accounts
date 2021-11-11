using System;
using System.Net.Http.Headers;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFace.Models.Response;
using MyFace.Repositories;


namespace MyFace.Controllers
{
    [ApiController]
    [Route("/login")]
    public class LoginController : ControllerBase
    {
        
        private readonly IUsersRepo _users;

        public LoginController(IUsersRepo users)
        {
            _users = users;
        }

        [HttpGet("")]
        [Authorize]
        public ActionResult<UserResponse> Index()
        {
            // var authHeader = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);
            // var credentialBytes = Convert.FromBase64String(authHeader.Parameter);
            // var credentials = Encoding.UTF8.GetString(credentialBytes).Split(new[] {':'}, 2);
            // var username = credentials[0];
            // var user = _users.GetByUsername(username);
            // return new UserResponse(user);

            return Ok();

        }
    }
}
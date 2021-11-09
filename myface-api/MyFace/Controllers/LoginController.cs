using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace MyFace.Controllers
{
    [ApiController]
    [Route("/login")]
    public class LoginController : ControllerBase
    {
        [HttpGet("")]
        [Authorize]
        public ActionResult Index()
        {
            Console.WriteLine("came here");
            return Ok();  // You may come in :)
        }
    }
}
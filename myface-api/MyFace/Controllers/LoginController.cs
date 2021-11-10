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
            return Ok();  // You may come in :)
        }
    }
}
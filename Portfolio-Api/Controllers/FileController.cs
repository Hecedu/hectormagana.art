using Microsoft.AspNetCore.Mvc;

namespace Portfolio_Api.Controllers
{
    public class FileController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

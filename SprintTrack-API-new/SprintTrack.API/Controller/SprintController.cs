using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SprintTrack.Application.Services;
using static SprintTrack.Data.Class1;

namespace SprintTrack.API.Controller
{
    [Authorize(Roles = "Admin,User")]
    [Route("api/[controller]")]
    [ApiController]
    public class SprintController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SprintController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Route("GetAllSprints")]
        public async Task<IActionResult> GetAllSprints()
        {
            var result = await _mediator.Send(new getAllSprintService());
            return Ok(result);
        }

        [HttpPost]
        [Route("GetSprints")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetSprints([FromBody] getSprintService values)
        {
            var result = await _mediator.Send(values);
            return Ok(result);
        }

        [HttpPost]
        [Route("saveSprints")]
        public async Task<IActionResult> saveSprints([FromBody] saveSprintService values)
        {
            var result = await _mediator.Send(values);
            return Ok(result);
        }

        [HttpGet]
        [Route("ListTicket")]
        public async Task<IActionResult> ListTicket()
        {
            var result = await _mediator.Send(new ListTicketService());
            return Ok(result);
        }

        [HttpPost]
        [Route("UploadTempFile"), DisableRequestSizeLimit]
        public async Task<IActionResult> UploadTempFile(IFormFile file)
        {
            var fileRootPath = Request.Form["fileRootPath"];
            //string Document_Path = "";
            DocumentPath document = new DocumentPath();
            string oldDocumentPath = Request.Form["oldDocument"];

            //var file = Request.Form.Files[0];
            if (file != null && file.Length > 0)
            {
                string extension = Path.GetExtension(file.FileName);
                var fileName = "Temp/" + DateTime.Now.ToString("yyyyMMddhmmss") + extension;
                var fileSavePath = fileRootPath + "/" + fileName;
                if (!Directory.Exists(fileRootPath + "/Temp/"))
                {
                    Directory.CreateDirectory(fileRootPath + "/Temp/");
                }
                DirectoryInfo directoryInfo = new DirectoryInfo(fileRootPath + "/Temp/");
                DateTime dateForButton = DateTime.Now.AddDays(-1);
                FileInfo[] existFiles = directoryInfo.GetFiles("*" + DateTime.Now.AddDays(-1).ToString("yyyyMMdd") + "*" + ".*");
                if (existFiles.Length > 0)
                {
                    foreach (FileInfo files in existFiles)
                    {
                        files.Delete();
                    }
                }
                using (var stream = new FileStream(fileSavePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                    document.Document_Path = fileName;
                }
            }
            else if (file == null)
            {
                if (oldDocumentPath != "" && oldDocumentPath != null && oldDocumentPath != "null")
                {
                    DirectoryInfo directoryInfo = new DirectoryInfo(fileRootPath + "/Temp/");
                    FileInfo[] OldexistFiles = directoryInfo.GetFiles(oldDocumentPath.Split("/")[1].Split(".")[0] + ".*");
                    if (OldexistFiles.Length > 0)
                    {
                        foreach (FileInfo files in OldexistFiles)
                        {
                            files.Delete();
                        }
                    }
                }
            }

            return Ok(document);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hotel.Management.Tool.Presentation.Controllers
{
    [Authorize]
    [Route("bill")]
    public class BillController : ControllerBase
    {
    }
}

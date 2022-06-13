using AHM.Logistic.Smart.Common.Models;
using AHM_LOGISTIC_SMART_ADM.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_LOGISTIC_SMART_ADM.Controllers
{
    public class CustomersNotesController : Controller
    {
        private readonly CustomersService _customersService;
        public CustomersNotesController(CustomersService customersService)
        {
            _customersService = customersService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Create()
        {
            var model = new CustomerNotesModel();
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CustomerNotesModel model)
        {
            var resultado = await _customersService.InsertCustomerNotes(model);
            return Json(resultado);
        }
    }
}

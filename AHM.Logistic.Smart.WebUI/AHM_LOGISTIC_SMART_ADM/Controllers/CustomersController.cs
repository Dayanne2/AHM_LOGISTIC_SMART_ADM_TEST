using AHM.Logistic.Smart.Common.Models;
using AHM_LOGISTIC_SMART_ADM.Models;
using AHM_LOGISTIC_SMART_ADM.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_LOGISTIC_SMART_ADM.Controllers
{
    public class CustomersController : Controller
    {
        private readonly CustomersService _customersService;

        public CustomersController(CustomersService customersService)
        {
            _customersService = customersService;
        }
        public async Task<IActionResult> Index()
        {
            var model = new List<CustomerViewModel>();
            var listado = await _customersService.CustomersList(model);
            //return View(listado.Data);
            if (listado.Data == null) return RedirectToAction("Error", "Home");
            else return View(listado.Data);
        }

        public async Task<IActionResult> CustomersList()
        {
            var model = new List<CustomerViewModel>();
            var list = await _customersService.CustomersList(model);
            return Json(list);
        }

        [HttpGet]
        public IActionResult Create()
        {
            var model = new CustomersModel();
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CustomersModel model)
        {
            var resultado = await _customersService.InsertCustomers(model);
            return Json(resultado);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var response = await _customersService.CustomersDetails(id);
            return View(response.Data);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(CustomerViewModel model)
        {
            var result = await _customersService.EditCustomers(model);
            return Json(result);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int Id, int Mod)
        {
            var result = await _customersService.DeleteCustomers(Id, Mod);
            return Json(result);
        }

        
    }
}

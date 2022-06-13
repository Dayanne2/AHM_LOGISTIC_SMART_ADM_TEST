using AHM_LOGISTIC_SMART_ADM.Models;
using AHM_LOGISTIC_SMART_ADM.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AHM.Logistic.Smart.Common.Models;

namespace AHM_LOGISTIC_SMART_ADM.Controllers
{
    public class ProductsController : Controller
    {

        private readonly SalesService _salesService;

        public ProductsController(SalesService salesService)
        {
            _salesService = salesService;
        }

        public async Task<IActionResult> Index()
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.ProductsViewModel>();
            var listado = await _salesService.ProductsList(model);

            return View(listado.Data);
        }

        public async Task<IActionResult> ProductsList()
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.ProductsViewModel>();
            var listado = await _salesService.ProductsList(model);

            return Json(listado);
        }

        [HttpGet]
        public IActionResult Create()
        {
            var model = new ProductsModel();
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ProductsModel model)
        {
            var result = await _salesService.InsertProducts(model);
            return Json(result);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var response = await _salesService.ProductDetails(id);
            return View(response.Data);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(ProductsViewModel model)
        {
            var result = await _salesService.EditProducts(model);
            return Json(result);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int Id, int Mod)
        {
            var result = await _salesService.DeleteProducts(Id, Mod);
            return Json(result);
        }
    }
}

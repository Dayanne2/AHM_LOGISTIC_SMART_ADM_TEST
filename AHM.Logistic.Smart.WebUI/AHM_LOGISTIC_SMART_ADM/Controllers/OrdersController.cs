using AHM.Logistic.Smart.Common.Models;
using AHM_LOGISTIC_SMART_ADM.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_LOGISTIC_SMART_ADM.Controllers
{
    public class OrdersController : Controller
    {
        private readonly SalesService _salesService;

        public OrdersController(SalesService salesService)
        {
            _salesService = salesService;
        }
        //public async Task<IActionResult> Index()
        //{
        //    var model = new List<SalesOrderViewModel>();
        //    var listado = await _salesService.OrderList(model);

        //    return View(listado.Data);
        //}
        public IActionResult Create()
        {
            return View();
        }

        public IActionResult Edit()
        {
            return View();
        }
    }
}

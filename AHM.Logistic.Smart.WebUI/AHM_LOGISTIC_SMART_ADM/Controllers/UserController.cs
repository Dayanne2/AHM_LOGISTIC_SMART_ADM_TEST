using Microsoft.AspNetCore.Mvc;
using AHM_LOGISTIC_SMART_ADM.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AHM.Logistic.Smart.Common.Models;


namespace AHM_LOGISTIC_SMART_ADM.Controllers
{
    public class UserController : Controller
    {

        private readonly AccessService _accessService;

        public UserController(AccessService trepService)
        {
            _accessService = trepService;
        }

        public async Task<IActionResult> Index()
        {
            var model = new List<UsersViewModel>();
            var listado = await _accessService.UsersListado(model);

            return View(listado.Data);
        }

        [HttpGet]
        public async Task<IActionResult> UsersList()
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.UsersViewModel>();
            var result = await _accessService.UsersListado(model);
            return Json(result);
        }

        [HttpGet]
        public IActionResult Create()
        {
            var model = new UsersModel();
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create(UsersModel model)
        {
            var resultado = await _accessService.InsertUsers(model);
            return RedirectToAction("Index", "User");
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var response = await _accessService.UsersDetails(id);
            return Json(response);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(UsersModel model, int id)
        {
            var result = await _accessService.EditUsers(model, id);
            return RedirectToAction("Index", "User");
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int Id, int Mod)
        {
            var result = await _accessService.DeleteUsers(Id, Mod);
            return Json(result.Success);
        }
    }
}

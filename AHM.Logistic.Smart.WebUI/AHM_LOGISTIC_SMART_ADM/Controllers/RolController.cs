using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using AHM.Logistic.Smart.Common.Models;
using System.Threading.Tasks;
using AHM_LOGISTIC_SMART_ADM.Services;

namespace AHM_LOGISTIC_SMART_ADM.Controllers
{
    public class RolController : Controller
    {
        private readonly AccessService _accessService;

        public RolController(AccessService accessService)
        {
            _accessService = accessService;
        }
        //index
        public async Task<IActionResult> Index()
        {
            var model = new List<RolesViewModel>();
            var listado = await _accessService.RolesList(model);

            return View(listado.Data);
        }

        [HttpGet]//listado
        public async Task<IActionResult> DepartList()
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.RolesViewModel>();
            var result = await _accessService.RolesList(model);
            return Json(result);
        }

        [HttpGet]//listado
        public async Task<IActionResult> RolList()
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.RolesViewModel>();
            var result = await _accessService.RolesList(model);
            return Json(result);
        }

        public async Task<IActionResult> RolDetail(int id)
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.RolesViewModel>();
            var result = await _accessService.DetailsRoles(id);
            return Json(result);
        }

        [HttpGet]//insertar
        public IActionResult Create()
        {
            var model = new RolesModel();
            return View(model);
        }
        [HttpPost]
        public async Task<IActionResult> Create(RolesModel model)
        {
            var resultado = await _accessService.InsertRoles(model);
            return RedirectToAction("Index", "Rol");
        }

        [HttpGet]//actualizar
        public async Task<IActionResult> Edit(int id)
        {
            var response = await _accessService.DetailsRoles(id);
            return View(response.Data);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(RolesModel model, int id)
        {
            var result = await _accessService.EditRoles(model, id);
            return RedirectToAction("Index", "Rol");
        }

        [HttpDelete]//delete
        public async Task<IActionResult> Delete(int Id, int Mod)
        {
            var result = await _accessService.DeleteRol(Id, Mod);
            return Json(result.Success);
        }
    }
}

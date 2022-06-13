using Microsoft.AspNetCore.Mvc;
﻿using AHM_LOGISTIC_SMART_ADM.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AHM.Logistic.Smart.Common.Models;

namespace AHM_LOGISTIC_SMART_ADM.Controllers
{
    public class OccupationController : Controller
    {

        private readonly CatalogService _trepService;

        public OccupationController(CatalogService trepService)
        {
            _trepService = trepService;
        }

        public async Task<IActionResult> Index()
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.OccupationsViewModel>();
            var listado = await _trepService.OccupationsList(model);

            return View(listado.Data);
        }

        [HttpGet]
        public async Task<IActionResult> OccupationList()
        {
            var model = new List<AHM.Logistic.Smart.Common.Models.OccupationsViewModel>();
            var result = await _trepService.OccupationsList(model);
            return Json(result);
        }

        [HttpGet]
        public IActionResult Create()
        {
            var model = new OccupationsModel();
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create(OccupationsModel model)
        {
            var resultado = await _trepService.InsertOccupations(model);
            return RedirectToAction("Index", "Occupation");
        }
        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var response = await _trepService.OccupationsDetails(id);
            return Json(response);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(OccupationsModel model, int id)
        {
            var result = await _trepService.EditOccupations(model, id);
            return RedirectToAction("Index", "Occupation");
        }

        public async Task<IActionResult> Delete(int Id, int Mod)
        {
            var result = await _trepService.DeleteOccupations(Id, Mod);
            return Json(result.Success);
        }
    }
}

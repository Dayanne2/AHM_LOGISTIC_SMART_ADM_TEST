using AHM.Logistic.Smart.Common.Models;
using AHM_LOGISTIC_SMART_ADM.WebApi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_LOGISTIC_SMART_ADM.Services
{
    public class SalesService
    {
        private readonly TransmissionApi _api;

        public SalesService(TransmissionApi api)
        {
            _api = api;
        }
        #region tbCategorias

        public async Task<ServiceResult> CategoriesList(List<CategoryViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<List<CategoryViewModel>>(req =>
                {
                    req.Path = $"/api/Categories/List";
                    req.Content = model;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response.Data);
            }
            catch (Exception e)
            {
                e.ToString();
                return result.Error();
            }
        }

        public async Task<ServiceResult> CategoriesDetails(int id)
        {
            var result = new ServiceResult();
            var model = new CategoryModel();
            try
            {
                var response = await _api.Get<CategoryModel>(req => {
                    req.Path = $"/api/Categories/Details/{id}";
                    req.Content = model;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response.Data);
            }
            catch (Exception e)
            {
                e.ToString();
                return result.Error();
            }
        }

        public async Task<ServiceResult> InsertCategories(CategoryModel model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Post<CategoryModel>(req =>
                {
                    req.Path = $"/api/Categories/Insert";
                    req.Content = model;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response.Data);
            }
            catch (Exception)
            {
                return result.Error();
            }
        }

        public async Task<ServiceResult> CategoriesEdit(CategoryModel model, int id)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Put<CategoryModel>(req =>
                {
                    req.Path = $"/api/Categories/Update/{id}";
                    req.Content = model;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response.StatusCode);
            }
            catch (Exception)
            {
                return result.Error();
            }
        }

        public async Task<ServiceResult> DeleteCategories(int Id, int Mod)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Delete<CategoryModel>(req =>
                {
                    //req.Path = $"/api/Employees/Delete" + Id + "?Mod=" + Mod;
                    req.Path = $"/api/Categories/Delete/" + Id + "?Mod=" + Mod;
                    //req.Content = model;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response.StatusCode);
            }
            catch (Exception)
            {
                return result.Error();
            }
        }
        #endregion

        #region tbSubCategorias
        //listado
        public async Task<ServiceResult> SubCategoryList(List<SubCategoriesViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<List<SubCategoriesViewModel>>(req =>
                {
                    req.Path = $"/api/SubCategories/List";
                    req.Content = model;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response.Data);
            }
            catch (Exception e)
            {
                e.ToString();
                return result.Error();
            }
        }
        //insertar
        public async Task<ServiceResult> InsertSubCategories(SubCategoriesModel model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Post<SubCategoriesModel>(req =>
                {
                    req.Path = $"/api/SubCategories/Insert";
                    req.Content = model;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response.Data);
            }
            catch (Exception)
            {
                return result.Error();
            }
        }
        //details
        public async Task<ServiceResult> DetailsSubCategory(int Id)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<SubCategoriesViewModel>(req => {
                    req.Path = $"/api/SubCategories/Details/{Id}";
                    //req.Content = model;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response.Data);
            }
            catch (Exception e)
            {
                e.ToString();
                return result.Error();
            }
        }
        //Delete
        public async Task<ServiceResult> DeleteSubCategory(int Id, int Mod)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Delete<SubCategoriesModel>(req =>
                {
                    //req.Path = $"/api/Employees/Delete" + Id + "?Mod=" + Mod;
                    req.Path = $"/api/SubCategories/Delete/" + Id + "?Mod=" + Mod;
                    //req.Content = model;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response.StatusCode);
            }
            catch (Exception)
            {
                return result.Error();
            }
        }
        //edit
        public async Task<ServiceResult> EditSubCategory(SubCategoriesModel model, int id)
        {
            var result = new ServiceResult();

            try
            {
                var response = await _api.Put<SubCategoriesModel>(req =>
                {
                    req.Path = $"/api/SubCategories/Update/{id}";
                    req.Content = model;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response.StatusCode);
            }
            catch (Exception)
            {
                return result.Error();
            }
        }


        #endregion

        #region tbProductos
        public async Task<ServiceResult> ProductsList(List<ProductsViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<List<ProductsViewModel>>(req =>
                {
                    req.Path = $"/api/Products/List";
                    req.Content = model;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response.Data);
            }
            catch (Exception e)
            {
                e.ToString();
                return result.Error();
            }
        }

        public async Task<ServiceResult> ProductDetails(int id)
        {
            var result = new ServiceResult();
            var model = new ProductsViewModel();
            try
            {
                var response = await _api.Get<ProductsViewModel>(req => {
                    req.Path = $"/api/Products/Details/{id}";
                    req.Content = model;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response.Data);
            }
            catch (Exception e)
            {
                e.ToString();
                return result.Error();
            }
        }

        public async Task<ServiceResult> InsertProducts(ProductsModel model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Post<ProductsModel>(req =>
                {
                    req.Path = $"/api/Products/Insert";
                    req.Content = model;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response.Data);
            }
            catch (Exception)
            {
                return result.Error();
            }
        }

        public async Task<ServiceResult> EditProducts(ProductsViewModel model)
        {
            var result = new ServiceResult();
            var Object = new ProductsModel()
            {
                pro_Description = model.pro_Description,
                pro_PurchasePrice = model.pro_PurchasePrice,
                pro_SalesPrice = model.pro_SalesPrice,
                pro_Stock = model.pro_Stock,
                pro_ISV = model.pro_ISV,
                uni_Id = model.uni_Id,
                scat_Id = model.scat_Id,
                pro_IdUserCreate = model.pro_IdUserCreate,
                pro_IdUserModified = model.pro_IdUserModified,
            };
            try
            {
                var response = await _api.Put<ProductsModel>(req =>
                {
                    req.Path = $"/api/Products/Update/{model.pro_Id}";
                    req.Content = Object;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response.StatusCode);
            }
            catch (Exception e)
            {
                e.ToString();
                return result.Error();
            }
        }

        public async Task<ServiceResult> DeleteProducts(int Id, int Mod)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Delete<ProductsModel>(req =>
                {
                    req.Path = $"/api/Products/Delete/" + Id + "?Mod=" + Mod;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response.StatusCode);
            }
            catch (Exception)
            {
                return result.Error();
            }
        }
        #endregion

        #region tbCotizations
        public async Task<ServiceResult> CotizationsList(List<CotizationsViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<List<CotizationsViewModel>>(req =>
                {
                    req.Path = $"/api/Cotizations/List";
                    req.Content = model;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response.Data);
            }
            catch (Exception e)
            {
                e.ToString();
                return result.Error();
            }
        }

        public async Task<ServiceResult> CotizationsDetails(int id)
        {
            var result = new ServiceResult();
            var model = new List<CotizationsDetailsViewModel>();
            try
            {
                var response = await _api.Get<List<CotizationsDetailsViewModel>>(req =>
                {
                    req.Path = $"/api/Cotizations/CotizationsDetails/{id}";
                    req.Content = model;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response.Data);
            }
            catch (Exception e)
            {
                e.ToString();
                return result.Error();
            }
        }

        public async Task<ServiceResult> InsertCotizations(CotizationsModel model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Post<CotizationsModel>(req =>
                {
                    req.Path = $"/api/Cotizations/Insert";
                    req.Content = model;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response.Data);
            }
            catch (Exception)
            {
                return result.Error();
            }
        }

        public async Task<ServiceResult> EditCotizations(CotizationsModel model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Post<CotizationsModel>(req =>
                {
                    req.Path = "/api/Cotizations/Update";
                    req.Content = model;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response.Data);
            }
            catch (Exception)
            {
                return result.Error();
            }
        }

        public async Task<ServiceResult> DeleteCotizations(int Id, int Mod)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Delete<CotizationsModel>(req =>
                {
                    req.Path = $"/api/Cotizations/Delete/" + Id + "?Mod=" + Mod;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response.StatusCode);
            }
            catch (Exception )
            {
                return result.Error();
            }
        }
        #endregion

        #region SalesOrder
        //public async Task<ServiceResult> OrderList(List<SalesOrderViewModel> model)
        //{
        //    var result = new ServiceResult();
        //    try
        //    {
        //        var response = await _api.Get<List<SalesOrderViewModel>>(req =>
        //        {
        //            req.Path = $"/api/Orders/List";
        //            req.Content = model;
        //        });

        //        if (!response.Success)
        //            return result.FromApi(response);

        //        return result.Ok(response.Data);
        //    }
        //    catch (Exception e)
        //    {
        //        e.ToString();
        //        return result.Error();
        //    }
        //}
        #endregion
    }
}

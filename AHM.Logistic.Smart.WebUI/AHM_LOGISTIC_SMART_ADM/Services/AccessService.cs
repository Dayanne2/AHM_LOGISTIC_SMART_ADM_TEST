using AHM_LOGISTIC_SMART_ADM.Models;
using AHM_LOGISTIC_SMART_ADM.WebApi;
using AHM.Logistic.Smart.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_LOGISTIC_SMART_ADM.Services
{
    public class AccessService
    {
        private readonly TransmissionApi _api;

        public AccessService(TransmissionApi api)
        {
            _api = api;
        }

        #region tbUsuarios
        //List
        public async Task<ServiceResult> UsersListado(List<UsersViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<List<UsersViewModel>>(req => {
                    req.Path = $"/api/Users/List";
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


        public async Task<ServiceResult> UsersDetails(int id)
        {
            var result = new ServiceResult();
            var model = new UsersViewModel();
            try
            {
                var response = await _api.Get<UsersViewModel>(req => {
                    req.Path = $"/api/Users/Details/{id}";
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

        public async Task<ServiceResult> InsertUsers(UsersModel model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Post<UsersModel>(req =>
                {
                    req.Path = $"/api/Users/Insert";
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

        public async Task<ServiceResult> EditUsers(UsersModel model, int id)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Put<UsersModel>(req =>
                {
                    req.Path = $"/api/Users/Update/{id}";
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

        public async Task<ServiceResult> DeleteUsers(int Id, int Mod)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Delete<UsersModel>(req =>
                {
                    //req.Path = $"/api/Employees/Delete" + Id + "?Mod=" + Mod;
                    req.Path = $"/api/Users/Delete/" + Id + "?Mod=" + Mod;
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


        #region tbRoles
        //Listado
        public async Task<ServiceResult> RolesList(List<RolesViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<List<RolesViewModel>>(req => {
                    req.Path = $"/api/Roles/List";
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
        public async Task<ServiceResult> InsertRoles(RolesModel model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Post<RolesModel>(req =>
                {
                    req.Path = $"/api/Roles/Insert";
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
        public async Task<ServiceResult> DetailsRoles(int Id)
        {
            var result = new ServiceResult();
            //var model = new RolesViewModel();
            try
            {
                var response = await _api.Get<RolesViewModel>(req => {
                    req.Path = $"/api/Roles/Details/{Id}";
                    // req.Content = model;
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

        //edit
        public async Task<ServiceResult> EditRoles(RolesModel model, int id)
        {
            var result = new ServiceResult();

            try
            {
                var response = await _api.Put<RolesModel>(req =>
                {
                    req.Path = $"/api/Roles/Update/{id}";
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

        //Delete
        public async Task<ServiceResult> DeleteRol(int Id, int Mod)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Delete<RolesModel>(req =>
                {
                    //req.Path = $"/api/Employees/Delete" + Id + "?Mod=" + Mod;
                    req.Path = $"/api/Roles/Delete/" + Id + "?Mod=" + Mod;
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
    }
}

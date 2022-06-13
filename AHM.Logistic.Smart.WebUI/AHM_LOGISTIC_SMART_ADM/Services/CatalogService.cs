using AHM_LOGISTIC_SMART_ADM.Models;
using AHM_LOGISTIC_SMART_ADM.WebApi;
using AHM.Logistic.Smart.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_LOGISTIC_SMART_ADM.Services
{
    public class CatalogService
    {
        private readonly TransmissionApi _api;

        public CatalogService(TransmissionApi api)
        {
            _api = api;
        }

        #region tbCountries
        public async Task<ServiceResult> CountriesList(List<CountryViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<List<CountryViewModel>>(req => {
                    req.Path = $"/api/Country/List";
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

        public async Task<ServiceResult> DetailsCountries(int Id)
        {
            var result = new ServiceResult();
            var model = new CountryViewModel();
            try
            {
                var response = await _api.Get<CountryViewModel>(req => {
                    req.Path = $"/api/Country/Details/{Id}";
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

        public async Task<ServiceResult> InsertCountries(CountryModel model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Post<CountryModel>(req =>
                {
                    req.Path = $"/api/Country/Insert";
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

        public async Task<ServiceResult> EditCountries(CountryModel model, int Id)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Put<CountryModel>(req =>
                {
                    req.Path = $"/api/Country/Update/{Id}";
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

        public async Task<ServiceResult> DeleteCountries(int Id, int Mod)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Delete<CountryModel>(req =>
                {
                    req.Path = $"/api/Country/Delete/" + Id + "?Mod=" + Mod;
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

        #region tbDepartments
        //List
        public async Task<ServiceResult> ApiDepartmentsList(List<DepartmentsViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<List<DepartmentsViewModel>>(req => {
                    req.Path = $"/api/Departments/List";
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
        //Insert
        public async Task<ServiceResult> InsertDepartments(DepartmentsModel model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Post<DepartmentsModel>(req =>
                {
                    req.Path = $"/api/Departments/Insert";
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
        //Delete
        public async Task<ServiceResult> DeleteDepartments(int Id, int Mod)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Delete<DepartmentsModel>(req =>
                {
                    //req.Path = $"/api/Employees/Delete" + Id + "?Mod=" + Mod;
                    req.Path = $"/api/Departments/Delete/" + Id + "?Mod=" + Mod;
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
        public async Task<ServiceResult> EditDepartments(DepartmentsModel model, int id)
        {
            var result = new ServiceResult();

            try
            {
                var response = await _api.Put<DepartmentsModel>(req =>
                {
                    req.Path = $"/api/Departments/Update/{id}";
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
        //details
        public async Task<ServiceResult> DetailsDepartments(int Id)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<DepartmentsViewModel>(req => {
                    req.Path = $"/api/Departments/Details/{Id}";
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

        #endregion

        #region tbAreas
        public async Task<ServiceResult> AreasList(List<AreasViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<List<AreasViewModel>>(req => {
                    req.Path = $"/api/Areas/List";
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

        public async Task<ServiceResult> AreasDetails(int id)
        {
            var result = new ServiceResult();
            var model = new AreasViewModel();
            try
            {
                var response = await _api.Get<AreasViewModel>(req => {
                    req.Path = $"/api/Areas/Details/{id}";
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

        public async Task<ServiceResult> InsertAreas(AreasModel model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Post<AreasModel>(req =>
                {
                    req.Path = $"/api/Areas/Insert";
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

        public async Task<ServiceResult> EditAreas(AreasModel model, int id)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Put<AreasModel>(req =>
                {
                    req.Path = $"/api/Areas/Update/{id}";
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

        public async Task<ServiceResult> DeleteAreas(int Id, int Mod)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Delete<AreasModel>(req =>
                {
                    //req.Path = $"/api/Employees/Delete" + Id + "?Mod=" + Mod;
                    req.Path = $"/api/Areas/Delete/" + Id + "?Mod=" + Mod;
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

        #region tbMuncipalities
        public async Task<ServiceResult> MunicipalitiesList(List<MunicipalitiesViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<List<MunicipalitiesViewModel>>(req => {
                    req.Path = $"/api/Municipalities/List";
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


        public async Task<ServiceResult> MunicipalitiesDetails(int Id)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<MunicipalitiesViewModel>(req => {
                    req.Path = $"/api/Municipalities/Details/{Id}";
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

        public async Task<ServiceResult> MunicipalitiesEdit(MunicipalitiesModel model, int Id)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Put<MunicipalitiesModel>(req =>
                {
                    req.Path = $"/api/Municipalities/Update/{Id}";
                    req.Content = model;
                });

                if (!response.Success)
                    return result.FromApi(response);

                return result.Ok(response);
            }
            catch (Exception)
            {
                return result.Error();
            }
        }

        public async Task<ServiceResult> MunicipalitiesInsert(MunicipalitiesModel model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Post<MunicipalitiesModel>(req =>
                {
                    req.Path = $"/api/Municipalities/Insert";
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

        public async Task<ServiceResult> MunicipalitiesDelete(int Id, int Mod)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Delete<MunicipalitiesModel>(req =>
                {
                    //req.Path = $"/api/Employees/Delete" + Id + "?Mod=" + Mod;
                    req.Path = $"/api/Municipalities/Delete/" + Id + "?Mod=" + Mod;
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

        #region tbPersonas
        public async Task<ServiceResult> PersonsList(List<PersonsViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<List<PersonsViewModel>>(req => {
                    req.Path = $"/api/Persons/List";
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

        public async Task<ServiceResult> PersonsDetails(int id)
        {
            var result = new ServiceResult();
            var model = new PersonsViewModel();
            try
            {
                var response = await _api.Get<PersonsViewModel>(req => {
                    req.Path = $"/api/Persons/Details/{id}";
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

        public async Task<ServiceResult> InsertPersons(PersonsModel model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Post<PersonsModel>(req =>
                {
                    req.Path = $"/api/Persons/Insert";
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

        public async Task<ServiceResult> EditPersons(PersonsViewModel model)
        {
            var result = new ServiceResult();
            var Object = new PersonsModel()
            {
                per_Identidad = model.per_Identidad,
                per_Firstname = model.per_Firstname,
                per_Secondname = model.per_Secondname,
                per_LastNames = model.per_LastNames,
                per_BirthDate = model.per_BirthDate,
                per_Sex = model.per_Sex,
                per_Email = model.per_Email,
                per_Phone = model.per_Phone,
                per_Direccion = model.per_Direccion,
                dep_Id = model.dep_Id,
                mun_Id = model.mun_Id,
                per_Esciv = model.per_Esciv,
                per_IdUserCreate = model.per_IdUserCreate,
                per_IdUserModified = model.per_IdUserModified
            };
            try
            {
                var response = await _api.Put<PersonsModel>(req =>
                {
                    req.Path = $"/api/Persons/Update/{model.per_Id}";
                    req.Content = Object;
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

        public async Task<ServiceResult> DeletePersons(int Id, int Mod)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Delete<PersonsModel>(req =>
                {
                    req.Path = $"/api/Persons/Delete/" + Id + "?Mod=" + Mod;
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

        #region tbOccupations
        public async Task<ServiceResult> OccupationsList(List<OccupationsViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<List<OccupationsViewModel>>(req => {
                    req.Path = $"/api/Occupations/List";
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

        public async Task<ServiceResult> OccupationsDetails(int id)
        {
            var result = new ServiceResult();
            var model = new OccupationsViewModel();
            try
            {
                var response = await _api.Get<OccupationsViewModel>(req => {
                    req.Path = $"/api/Occupations/Details/{id}";
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

        public async Task<ServiceResult> InsertOccupations(OccupationsModel model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Post<OccupationsModel>(req =>
                {
                    req.Path = $"/api/Occupations/Insert";
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

        public async Task<ServiceResult> DeleteOccupations(int Id, int Mod)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Delete<OccupationsModel>(req =>
                {
                    req.Path = $"/api/Occupations/Delete/" + Id + "?Mod=" + Mod;
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
        public async Task<ServiceResult> EditOccupations(OccupationsModel model, int id)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Put<OccupationsModel>(req =>
                {
                    req.Path = $"/api/Occupations/Update/{id}";
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

        #region tbEmployees
        public async Task<ServiceResult> EmployeesList(List<EmployeesViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<List<EmployeesViewModel>>(req => {
                    req.Path = $"/api/Employees/List";
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

        public async Task<ServiceResult> DetailsEmployees(int Id)
        {
            var result = new ServiceResult();
            var model = new AreasViewModel();
            try
            {
                var response = await _api.Get<EmployeesViewModel>(req => {
                    req.Path = $"/api/Employees/Details/{Id}";
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

        public async Task<ServiceResult> InsertEmployees(EmployeesModel model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Post<EmployeesModel>(req =>
                {
                    req.Path = $"/api/Employees/Insert";
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

        public async Task<ServiceResult> EditEmployees(EmployeesModel model, int Id)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Put<EmployeesModel>(req =>
                {
                    req.Path = $"/api/Employees/Update/{Id}";
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

        public async Task<ServiceResult> DeleteEmployees(int Id, int Mod)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Delete<EmployeesModel>(req =>
                {
                    //req.Path = $"/api/Employees/Delete" + Id + "?Mod=" + Mod;
                    req.Path = $"/api/Employees/Delete/" + Id + "?Mod=" + Mod;
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

using AHM_LOGISTIC_SMART_ADM.Models;
using AHM_LOGISTIC_SMART_ADM.WebApi;
using AHM.Logistic.Smart.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_LOGISTIC_SMART_ADM.Services
{
    public class CustomersService
    {
        private readonly TransmissionApi _api;

        public CustomersService(TransmissionApi api)
        {
            _api = api;
        }

        #region tbCustomers
        public async Task<ServiceResult> CustomersList(List<CustomerViewModel> model)
        {
            var result = new ServiceResult();
      
            try
            {
                var response = await _api.Get<List<CustomerViewModel>>(req => {
                    req.Path = $"/api/Customers/List";
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

        public async Task<ServiceResult> CustomersDetails(int id)
        {
            var result = new ServiceResult();
            var model = new CustomerViewModel();
            try
            {
                var response = await _api.Get<CustomerViewModel>(req => {
                    req.Path = $"/api/Customers/Details/{id}";
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

        public async Task<ServiceResult> InsertCustomers(CustomersModel model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Post<CustomersModel>(req =>
                {
                    req.Path = $"/api/Customers/Insert";
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

        public async Task<ServiceResult> EditCustomers(CustomerViewModel model)
        {
            var result = new ServiceResult();
            var Object = new CustomersModel()
            {
                cus_AssignedUser = model.cus_AssignedUser,
                tyCh_Id = model.tyCh_Id,
                cus_Name = model.cus_Name,
                cus_RTN = model.cus_RTN,
                cus_Address = model.cus_Address,
                dep_Id = model.dep_Id,
                mun_Id = model.mun_Id,
                cus_Email = model.cus_Email,
                cus_Phone = model.cus_Phone,
                cus_AnotherPhone = model.cus_AnotherPhone,
                cus_IdUserCreate = model.cus_IdUserCreate,
                cus_IdUserModified = model.cus_IdUserModified,
            };
            try
            {
                var response = await _api.Put<CustomersModel>(req =>
                {
                    req.Path = $"/api/Customers/Update/{model.cus_Id}";
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

        public async Task<ServiceResult> DeleteCustomers(int Id, int Mod)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Delete<CustomersModel>(req =>
                {
                    req.Path = $"/api/Customers/Delete/" + Id + "?Mod=" + Mod;
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

        #region tbContacts
        public async Task<ServiceResult> ApiContactsList(List<ContactsViewModel> model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Get<List<ContactsViewModel>>(req => {
                    req.Path = $"/api/Contacts/List";
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

        public async Task<ServiceResult> ContactsDetails(int id)
        {
            var result = new ServiceResult();
            var model = new ContactsViewModel();
            try
            {
                var response = await _api.Get<ContactsViewModel>(req => {
                    req.Path = $"/api/Contacts/Details/{id}";
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

        public async Task<ServiceResult> InsertContacts(ContactsModel model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Post<ContactsModel>(req =>
                {
                    req.Path = $"/api/Contacts/Insert";
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

        public async Task<ServiceResult> DeleteContacts(int Id, int Mod)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Delete<ContactsModel>(req =>
                {
                    req.Path = $"/api/Contacts/Delete/" + Id + "?Mod=" + Mod;
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
        public async Task<ServiceResult> EditContacts(ContactsModel model, int id)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Put<ContactsModel>(req =>
                {
                    req.Path = $"/api/Contacts/Update/{id}";
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

        #region tbCustomerNotes

        public async Task<ServiceResult> InsertCustomerNotes(CustomerNotesModel model)
        {
            var result = new ServiceResult();
            try
            {
                var response = await _api.Post<CustomerNotesModel>(req =>
                {
                    req.Path = $"/api/CustomerNotes/Insert";
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

        #endregion
    }
}

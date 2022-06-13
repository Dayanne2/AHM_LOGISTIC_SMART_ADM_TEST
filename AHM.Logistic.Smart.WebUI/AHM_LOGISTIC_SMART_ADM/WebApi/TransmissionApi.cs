using AHM_LOGISTIC_SMART_ADM.Configuration;
using AHM_LOGISTIC_SMART_ADM.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace AHM_LOGISTIC_SMART_ADM.WebApi
{
    public class TransmissionApi
    {
        private readonly HttpClient _client;
        private readonly IHttpContextAccessor _httpContext;
        private readonly AppSettings _appSettings;

        public TransmissionApi(HttpClient client,
            IHttpContextAccessor httpContext,
            IOptions<AppSettings> appSettings)
        {
            _client = client;
            _httpContext = httpContext;
            _appSettings = appSettings.Value;

            _client.BaseAddress = new Uri(_appSettings.ApiSettings.BaseUrl);
            //_client.DefaultRequestHeaders.Add("Authorization", $"Bearer {_appSettings.ApiSettings.AccessToken}");
            _client.Timeout = TimeSpan.FromSeconds(_appSettings.ApiSettings.TimeoutSeconds);
        }

        public async Task<ApiResult<T>> Get<T>(Action<ApiCallConfiguration<T>> action)
        {
            var config = new ApiCallConfiguration<T>();
            action(config);
            var response = await _client.GetAsync(config.PathWithQueryStrings);
            var content = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<ApiResult<T>>(content);
            if (result != null)
            {
                result.Path = config.Path;
                result.StatusCode = response.StatusCode;
                
            }
            return result;
        }

        public async Task<ApiResult<T>> Post<T>(Action<ApiCallConfiguration<T>> action)
        {
            var config = new ApiCallConfiguration<T>();
            var result = new ApiResult<T>();
            try
            {
                action(config);
                var response = await _client.PostAsync(config.PathWithQueryStrings, config.ContentJson);
                var content = await response.Content.ReadAsStringAsync();
                var resultContent = JsonConvert.DeserializeObject<T>(content);
                result.Data = resultContent;
                result.Path = config.Path;
                result.StatusCode = response.StatusCode;
                if (response.StatusCode == HttpStatusCode.OK)
                    result.Success = true;
                else
                    result.Success = false;
            }
            catch (Exception)
            {
                result.Success = false;
            }
            return result;
        }

        public async Task<ApiResult> Put<T>(Action<ApiCallConfiguration<T>> action)
        {
            var config = new ApiCallConfiguration<T>();
            action(config);

            var response = await _client.PutAsync(config.PathWithQueryStrings, config.ContentJson);
            var content = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<ApiResult>(content);
            result.Path = config.Path;
            result.StatusCode = response.StatusCode;

            return result;
        }

        public async Task<ApiResult> Delete<T>(Action<ApiCallConfiguration<T>> action)
        {
            var config = new ApiCallConfiguration<T>();
            action(config);

            var response = await _client.DeleteAsync(config.PathWithQueryStrings);
            var content = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<ApiResult>(content);
            result.Path = config.Path;
            result.StatusCode = response.StatusCode;
            return result;
        }
    }
}

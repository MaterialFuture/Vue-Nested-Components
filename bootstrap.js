/**
 * This bootstrap file setups all the imports and window attachments. It also sets up axios and some simple convinces
 * for ajax requests.
 */
import $ from 'jquery';
require('bootstrap');
import _ from 'lodash';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import jszip from 'jszip';
import pdfmake from 'pdfmake';
import 'datatables.net-bs4';
import 'datatables.net-autofill-bs4';
import 'datatables.net-buttons-bs4';
import 'datatables.net-colreorder-bs4';
import 'datatables.net-fixedcolumns-bs4';
import 'datatables.net-fixedheader-bs4';
import 'datatables.net-keytable-bs4'
import 'datatables.net-responsive-bs4';
import 'datatables.net-rowgroup-bs4';
import 'datatables.net-rowreorder-bs4';
import 'datatables.net-scroller-bs4';
import 'datatables.net-select-bs4';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import 'popper.js';
import JSONFormatter from 'json-formatter-js';

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

window.$ = window.jQuery = $;
window._ = _; // Lodash
window.Vue = Vue;
window.swal = Swal;
window.jszip = jszip;
window.pdfmake = pdfmake;
window.Popper = require('popper.js').default;
Vue.use(BootstrapVue);
window.JSONFormatter = JSONFormatter;

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
    },
});

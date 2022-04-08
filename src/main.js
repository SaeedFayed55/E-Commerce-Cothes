import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//------------- vueSax-----------
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import 'boxicons/css/boxicons.min.css'
Vue.use(Vuesax, {})
//-------------------------------

//----------- Prime Flex----------
import 'primeflex/primeflex.css';
//-------------------------------

//----------- vuelidate---------
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
//------------------------------

//--------------- axios--------------
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:3000"

//---------primeVue--------------
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
Vue.use(PrimeVue);
import Dialog from 'primevue/dialog';
Vue.component('Dialog', Dialog);

//------primeVue components----------
import Button from 'primevue/button';
Vue.component('Button',Button);

import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
Vue.use(ToastService)
Vue.component('Toast' , Toast)

import Card from 'primevue/card';
Vue.component('Card' , Card)

import InputText from 'primevue/inputtext';
Vue.component('InputText' ,InputText)

import Password from 'primevue/password';
Vue.component('Password' ,Password)

import Calendar from 'primevue/calendar';
Vue.component('Calendar' ,Calendar)

import Dropdown from 'primevue/dropdown';
Vue.component('Dropdown' ,Dropdown)

import Checkbox from 'primevue/checkbox';
Vue.component('Checkbox' ,Checkbox)

import Sidebar from 'primevue/sidebar';
Vue.component('Sidebar' ,Sidebar)

import Carousel from 'primevue/carousel';
Vue.component('Carousel' ,Carousel)

import PanelMenu from 'primevue/panelmenu';
Vue.component('PanelMenu' ,PanelMenu)

import Listbox from 'primevue/listbox';
Vue.component('Listbox' ,Listbox)

import Tree from 'primevue/tree';
Vue.component('Tree' ,Tree)

import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
Vue.component('Accordion' ,Accordion)
Vue.component('AccordionTab' ,AccordionTab)

import Panel from 'primevue/panel';
Vue.component('Panel' ,Panel)

import Menu from 'primevue/menu';
Vue.component('Menu' ,Menu)

import JwPagination from 'jw-vue-pagination';
Vue.component('JwPagination' ,JwPagination)

import Paginator from 'primevue/paginator';
Vue.component('Paginator' ,Paginator)

import MultiSelect from 'primevue/multiselect';
Vue.component('MultiSelect' ,MultiSelect)

import Textarea from 'primevue/textarea';
Vue.component('Textarea' ,Textarea);

import RadioButton from 'primevue/radiobutton';
Vue.component('RadioButton' ,RadioButton);

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup'; 
Vue.component('DataTable' ,DataTable);
Vue.component('Column' ,Column);
Vue.component('ColumnGroup' ,ColumnGroup);

import Toolbar from 'primevue/toolbar';
Vue.component('Toolbar' ,Toolbar);

import DataView from 'primevue/dataview';
Vue.component('DataView' , DataView);

import Rating from 'primevue/rating';
Vue.component('Rating' , Rating);

import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
Vue.component('DataViewLayoutOptions' , DataViewLayoutOptions);

import InputNumber from 'primevue/inputnumber';
Vue.component('InputNumber' , InputNumber);

import Badge from 'primevue/badge';
Vue.component('Badge' , Badge);

import Avatar from 'primevue/avatar';
Vue.component('Avatar' , Avatar);

import Steps from 'primevue/steps';
Vue.component('Steps' , Steps);

import InputMask from 'primevue/inputmask';
Vue.component('InputMask' , InputMask);

import ProgressSpinner from 'primevue/progressspinner';
Vue.component('ProgressSpinner' , ProgressSpinner);
import Menubar from 'primevue/menubar';
Vue.component('Menubar' , Menubar);

import Timeline from 'primevue/timeline';
Vue.component('Timeline' , Timeline);

import Galleria from 'primevue/galleria';
Vue.component('Galleria' , Galleria);

import ImagePreview from 'primevue/imagepreview';
Vue.component('ImagePreview' , ImagePreview);

import Message from 'primevue/message';
Vue.component('Message' , Message);
import InlineMessage from 'primevue/message';
Vue.component('InlineMessage' , InlineMessage);

import TabView from 'primevue/tabview';
Vue.component('TabView' , TabView);

import TabPanel from 'primevue/tabpanel';
Vue.component('TabPanel' , TabPanel);



Vue.config.productionTip = false

router.beforeEach( (to , from , next)=> {
  console.log('global before each')
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

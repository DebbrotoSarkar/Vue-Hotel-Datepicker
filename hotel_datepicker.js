/*
Features
 ::

  - Generate datepicker for all devices with responsive view
  - Multilingual support 
  - Date range count show on hover
  - Controlling dynamic data and function with Props
  - Using stylus for CSS

Usage
 ::

    Scripts   
        <script src="https://cdn.jsdelivr.net/npm/vue-hotel-datepicker@2.6.4/dist/vue-hotel-datepicker.min.js"></script>     
        <script src="modules/vrs/static/js/common/component/hotel_datepicker.js"></script>
    
    Html
        <hotel-datepicker
            @check-in="setCheckInDate($event)"
            @check-out="setCheckOutDate($event)">
        </hotel-datepicker>
    
Props
 ::

    +------------------------------+---------------------+------------+------------------------------------------------------------+ 
    | Prop                         |     Type            |  Required  | Description                                                |   
    +==============================+=====================+============+============================================================+ 
    | startDate                    |     String          |            | Starting date value from parent                            |           
    +------------------------------|---------------------|------------|------------------------------------------------------------- 
    | endDate                      |     String          |            | Ending date value from parent                              |           
    +------------------------------|---------------------|------------|------------------------------------------------------------- 
    | dateFormat                   |     String          |            | Default date format                                        |           
    +------------------------------|---------------------|------------|------------------------------------------------------------- 
    | dateStart                    |     String          |            | Default date check-in input field name                     |           
    +------------------------------|---------------------|------------|------------------------------------------------------------- 
    | dateEnd                      |     String          |            | Default date check-out input field name                    |           
    +------------------------------|---------------------|------------|-------------------------------------------------------------
    | datepickerInit               |     Object          |            | Define hotel datepicker language                           |           
    +------------------------------|---------------------|------------|-------------------------------------------------------------
    | datepickerWrapper            |     String          |            | Datepicker outer div class                                 |           
    +------------------------------|---------------------|------------|-------------------------------------------------------------
    | checkInDateInput             |     String          |            | Default date check-in input field id                       |           
    +------------------------------|---------------------|------------|------------------------------------------------------------- 
    | checkOutDateInput            |     String          |            | Default date check-out input field id                      |           
    +------------------------------|---------------------|------------|------------------------------------------------------------- 
    | datepickerInputClass         |     String          |            | Hidden input field class                                   |           
    +------------------------------|---------------------|------------|------------------------------------------------------------- 
    | searchKeyword                |     String          |            | Location keyword pass to component                         |           
    +------------------------------|---------------------|------------|-------------------------------------------------------------     
    | ~~emptySearchKeywordTrigger~~|     Function        |            | Emit true if searchKeyword is empty                        |           
    +------------------------------|---------------------|------------|------------------------------------------------------------- 

*/
Vue.component('hoteldatepicker', HotelDatePicker.default);
Vue.component('hotel-datepicker', {
    props: {
        startDate: {
            type: String,
            default: (typeof dynamic_info.request_args != 'undefined') ?  (typeof dynamic_info.request_args.date_start != 'undefined') ? new Date(dynamic_info.request_args.date_start) : null : null
            //default: null
        },
        endDate: {
            type: String,
            default: (typeof dynamic_info.request_args != 'undefined') ? (typeof dynamic_info.request_args.date_end != 'undefined') ? new Date(dynamic_info.request_args.date_end) : null : null
            //default: null
        },
        dateFormat: {
            type: String,
            default: "YYYY-MM-DD"
        },
        dateStart: {
            type: String,
            default: "date_start"
        },
        dateEnd: {
            type: String,
            default: "date_end"
        },
        searchKeyword: {
            type: String,
            default: ''
        },
        datepickerInit: {
            type: Object,
            default: {
                night: 'Night',
                nights: 'Nights',
                'day-names': ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
                'check-in': 'Check-in',
                'check-out': 'Check-out',
                'month-names': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            }
        },
        // Classes
        datepickerWrapperClass: {
            type: String,
            default: "datepicker-wrapper-class"
        },
        // Ids
        checkInDateInputId: {
            type: String,
            default: "checkInDateInputId"
        },
        checkOutDateInputId: {
            type: String,
            default: "checkOutDateInputId"
        },
        datepickerInputClass: {
            type: String,
            default: "datepickerInput"
        },
        emptySearchKeywordTrigger: {
            type: Function
        },
        triggerFormSubmit: {
            type: Function
        }
    },
    data: function () {
        return {
            checkInDate: '',
            checkOutDate: ''
        }
    },
    methods: {
        setDateFormat: function (date) {
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var yy = date.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            return yy + "-" + mm + "-" + dd;
        },
        setCheckInDate: function ($event) {

            if (!this.searchKeyword) {
                this.$emit('empty-search-keyword-trigger', true);
            }

            if ($event) {
                this.checkInDate = this.setDateFormat($event);
            } else {
                this.checkInDate = '';
            }
            this.$emit('check-in', this.checkInDate);
        },
        setCheckOutDate: function ($event) {
            if ($event) {
                this.checkOutDate = this.setDateFormat($event);
            } else {
                this.checkOutDate = '';
            }
            this.$emit('check-out', this.checkOutDate);

            if( this.checkOutDate.length > 0){  
                this.$nextTick(function(){
                    this.$emit('trigger-form-submit');
                })
            }
        }
    },
    template:
        '<div :class="datepickerWrapperClass">' +
        '<input :id="checkInDateInputId" :class="datepickerInputClass" type="text" :name="dateStart" :value="checkInDate" type="hidden"/>' +
        '<input :id="checkOutDateInputId" :class="datepickerInputClass" type="text" :name="dateEnd" :value="checkOutDate" type="hidden"/>' +
        '<hoteldatepicker :format="dateFormat"' +
        ':startingDateValue="startDate"' +
        ':endingDateValue="endDate"' +
        ':i18n="datepickerInit"' +
        '@check-in-changed="setCheckInDate"' +
        '@check-out-changed="setCheckOutDate"' +
        ':searchString="searchKeyword"></hoteldatepicker>' +
        '</div>'
});

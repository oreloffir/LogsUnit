var formsController = {
    init: function () {
        console.log("formsController init")

        this.bindEvent()
    },

    bindEvent: function () {
        $('#fileUpload').on('change',function ()
        {
            var filePath = $(this).val();
            $('#filePath').val(filePath)
        });

        $(".check").on('change', function() {
            if ($(this).is(':checked')) {
                $(this).attr('value', '1');
            } else {
                $(this).attr('value', '0');
            }
        });
    },

};
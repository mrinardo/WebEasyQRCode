/*
Class:
    df.WebEasyQRCode
Extends:
    df.WebBaseControl

Integration of the Easy QR Code Javascript Library (https://github.com/ushelp/EasyQRCodeJS).
    
Revision:
    2020/11/06  (JMR, DAW) 
        Initial version.
*/
df.WebEasyQRCode = function WebEasyQRCode(sName, oParent){
    df.WebEasyQRCode.base.constructor.call(this, sName, oParent);
    
    // Basic
    this.prop(df.tString, "psText", "");
    this.prop(df.tString, "psTitle", "");
    this.prop(df.tInt, "piQRCodeWidth", 256);
    this.prop(df.tInt, "piQRCodeHeight", 256);
    this.prop(df.tString, "psColorDark", "#000000");
    this.prop(df.tString, "psColorLight", "#ffffff");
    this.prop(df.tInt, "piCorrectLevel", 2); // H
    this.prop(df.tNumber, "pnDotScale", 1);

    // Quiet Zone
    this.prop(df.tInt, "piQuietZone", 0);
    this.prop(df.tString, "psQuietZoneColor", "transparent");

    // Logo options
    this.prop(df.tString, "psLogo", "");
    this.prop(df.tInt, "piLogoWidth", 0);
    this.prop(df.tInt, "piLogoHeight", 0);
    this.prop(df.tBoolean, "pbLogoBackgroundTransparent", false);
    this.prop(df.tString, "psLogoBackgroundColor", "#ffffff");

    // Backgroud Image options
    this.prop(df.tString, "psBackgroundImage", "");
    this.prop(df.tNumber, "pnBackgroundImageAlpha", 1);
    this.prop(df.tBoolean, "pbAutoColor", false);

    // Position Pattern Color options
    this.prop(df.tString, "psPO", "");
    this.prop(df.tString, "psPI", "");
    this.prop(df.tString, "psPO_TL", "");
    this.prop(df.tString, "psPI_TL", "");
    this.prop(df.tString, "psPO_TR", "");
    this.prop(df.tString, "psPI_TR", "");
    this.prop(df.tString, "psPO_BL", "");
    this.prop(df.tString, "psPI_BL", "");

    // Alignment Color options
    this.prop(df.tString, "psAO", "");
    this.prop(df.tString, "psAI", "");

    // Timing Pattern Color options
    this.prop(df.tString, "psTiming", "");
    this.prop(df.tString, "psTiming_H", "");
    this.prop(df.tString, "psTiming_V", "");

    // Title options
    this.prop(df.tString, "psTitle", "");
    this.prop(df.tString, "psTitleFont", "bold 16px Arial");
    this.prop(df.tString, "psTitleColor", "#000000");
    this.prop(df.tString, "psTitleBackgroundColor", "#ffffff");
    this.prop(df.tInt, "piTitleHeight", 0);
    this.prop(df.tInt, "piTitleTop", 30);

    // SubTitle options
    this.prop(df.tString, "psSubTitle", "");
    this.prop(df.tString, "psSubTitleFont", "14px Arial");
    this.prop(df.tString, "psSubTitleColor", "#4F4F4F");
    this.prop(df.tInt, "piSubTitleTop", 0);
           
    // @privates
    this._QRCode = null;
};
df.defineClass("df.WebEasyQRCode", "df.WebBaseControl",{

    /*
    Creates and return a QR Code parameters object.

    @private
    */
    getQRCodeParams : function() {
        var qrCodeParams = {
            text: this.psText,
            width: this.piQRCodeWidth,
            height: this.piQRCodeHeight,
            colorDark: this.psColorDark,
            colorLight: this.psColorLight,
            correctLevel: this.piCorrectLevel,
            dotScale: (typeof this.pnDotScale == "string" ? this.pnDotScale.replace(',','.') : this.pnDotScale), 
            quietZone: this.piQuietZone,
            quietZoneColor: this.psQuietZoneColor,
            logo: this.psLogo,
            logoWidth: this.piLogoWidth,
            logoHeight: this.piLogoHeight,
            logoBackgroundTransparent: (this.pbLogoBackgroundTransparent == '0' ? false : true),
            logoBackgroundColor: this.psLogoBackgroundColor,
            backgroundImage: this.psBackgroundImage,
            backgroundImageAlpha: (typeof this.pnBackgroundImageAlpha == "string" ? this.pnBackgroundImageAlpha.replace(',','.') : this.pnBackgroundImageAlpha),
            autoColor: this.pbAutoColor,
            PO: this.psPO,
            PI: this.psPI,
            PO_TL: this.psPO_TL,
            PI_TL: this.psPI_TL,
            PO_TR: this.psPO_TR,
            PI_TR: this.psPI_TR,
            PO_BL: this.psPO_BL,
            PI_BL: this.psPI_BL,
            AO: this.psAO,
            AI: this.psAI,
            timing: this.psTiming,
            timing_H: this.psTiming_H,
            timing_V: this.psTiming_V,
            title: this.psTitle,
            titleFont: this.psTitleFont,
            titleColor: this.psTitleColor,
            titleBackgroundColor: this.psTitleBackgroundColor,
            titleHeight: this.piTitleHeight,
            titleTop: this.piTitleTop,
            subTitle: this.psSubTitle,
            subTitleFont: this.psSubTitleFont,
            subTitleColor: this.psSubTitleColor,
            subTitleTop: this.piSubTitleTop
        };

        return qrCodeParams;
    },
    
    /*
    This method augments the html generation and adds the div.WebQRCode_Wrp element.

    @param  aHtml   String builder array containing html.

    @private
    */
    openHtml : function(aHtml){
        df.WebEasyQRCode.base.openHtml.call(this, aHtml);

        aHtml.push('<div class="WebEasyQRCode_Wrp">'); 
    },

    /*
    This method augments the html generation and closes the div.WebQRCode_Wrp element.

    @param  aHtml   String builder array containing html.

    @private
    */
    closeHtml : function(aHtml){
        aHtml.push('</div>');

        df.WebEasyQRCode.base.closeHtml.call(this, aHtml);
    },

    /*
    This method is called after rendering and is used the get references to DOM elements, attach event 
    listeners and do other initialization.

    @private
    */
    afterRender : function(){
        this._eControl = df.dom.query(this._eElem, "div.WebEasyQRCode_Wrp");
        
        df.WebEasyQRCode.base.afterRender.call(this);

        var qrCodeParams = this.getQRCodeParams();

        this._QRCode = new QRCode(this._eControl, qrCodeParams);
    },

    // - - - - - - Public API - - - - - -

    updateQRCode : function(){
        var qrCodeParams = this.getQRCodeParams();

        if (qrCodeParams) {
            for (var i in qrCodeParams) {
                this._QRCode._htOption[i] = qrCodeParams[i];
            }
        }

        this._QRCode.makeCode(this._QRCode._htOption.text);
    },

});
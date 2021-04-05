# WebEasyQRCode Library

WebEasyQRCode is a DataFlex library that uses the EasyQRCodeJS Javascript library for QR Code generation. With it you can generate and display QR Codes inside your DataFlex web applications.

Information about the EasyQRCodeJS library can be found at https://github.com/ushelp/EasyQRCodeJS.

For your convenience we have added comments to the packages created with useful information about its properties and methods.

## Files

The "Library" folder contains the files of the WebEasyQRCode library. To use it, you just need to copy the AppSrc and AppHtml into your own DataFlex workspace.

Add the following lines to your webapp's index.html, just below the custom controls line (`<!-- DataFlex Custom Controls (do not remove this line, used for automatic insertion) -->`).

*Note: Adjust the placeholder "[PATH]" to whatever the path inside your workspace is.*

```html
<link href="[PATH]/EasyQRCodeJS/WebEasyQRCode.css" rel="stylesheet" type="text/css" />
<script src="[PATH]/EasyQRCodeJS/easy.qrcode.min.js" type="text/javascript" charset="utf-8"></script>
<script src="[PATH]/EasyQRCodeJS/WebEasyQRCode.js" type="text/javascript" charset="utf-8"></script>
```
In your DataFlex web view, add an `Use` statement to **cWebEasyQRCode.pkg** and create a QR Code object like this:

```
Use cWebEasyQRCode.pkg

Object oQRCode is a cWebEasyQRCode
    Set piColumnSpan to 0
    Set psText to "Content of the QR Code"
    Set piQRCodeWidth to 300
    Set piQRCodeHeight to 300
End_Object
```

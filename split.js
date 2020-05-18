// split color regions  of an rgb image into layers;

// 2016, use it at your own risk;

#target photoshop

if (app.documents.length > 0) {

    if (app.activeDocument.mode = DocumentMode.RGB) {

        var time1 = Number(timeString());

        var myDocument = app.activeDocument.duplicate("theCopy", true);

        var theLayer = myDocument.activeLayer;

        var histo = myDocument.histogram;

        var total = 0;

        for (var n = 0; n < histo.length; n++) {

            total = total + histo;

        };

// collect histograms and non-0-values;

        var theHistos = new Array;

        for (var m = 0; m < 3; m++) {

            var histo = myDocument.channels.histogram;

            var theValues = new Array;

            for (var n = 0; n < histo.length; n++) {

                if (histo != 0) {theValues.push(n)}

            };

            theHistos.push([histo, theValues])

        };

////////////////////////////////////

        var theArray = new Array;

// create difference layer to determine which combinations of values exist more or less;

        var theSolid = solidColorLayer (55, 128, 200, "aaa", charIDToTypeID("Dfrn"));

// try;

        for (var n = 0; n < theHistos[0][1].length; n++) {

////////////////////////////////////

            for (var o = 0; o < theHistos[1][1].length; o++) {

////////////////////////////////////

                for (var p = 0; p < theHistos[2][1].length; p++) {

////////////////////////////////////

                    try {

                        $.writeln(theHistos[0][1]+"___"+theHistos[1][1]+"___"+theHistos[2][1]

                        );

                        changeSolidColorLayer (theHistos[0][1], theHistos[1][1], theHistos[2][1]

                        );

                        var checkHisto = myDocument.histogram;

                        if (checkHisto[0] > 0) {

                            theArray.push([theHistos[0][1], theHistos[1][1], theHistos[2][1]

                            ])

                        };

                    }

                    catch (e) {};

////////////////////////////////////

                };

////////////////////////////////////

            };

////////////////////////////////////

        };

        theSolid.remove();

// try to cut to layers;

        for (var a = 0; a < theArray.length; a++) {

            try {

                selectColorRange (theArray[0], theArray[1], theArray[2], 0);

                cutToLayer ();

                myDocument.activeLayer = theLayer;

            }

            catch (e) {};

        };

        var time2 = Number(timeString());

        alert(((time2-time1)/1000)+" seconds\nstart "+time1+"\nend "+time2)

    }

};

////// select color range //////

function selectColorRange (theR, theG, theB, fuzziness) {

// =======================================================

    var idClrR = charIDToTypeID( "ClrR" );

    var desc4 = new ActionDescriptor();

    var idFzns = charIDToTypeID( "Fzns" );

    desc4.putInteger( idFzns, fuzziness );

    var idMnm = charIDToTypeID( "Mnm " );

    var desc5 = new ActionDescriptor();

    var idR = charIDToTypeID( "Rd  " );

    desc5.putDouble( idR, theR );

    var idG = charIDToTypeID( "Grn " );

    desc5.putDouble( idG, theG );

    var idB = charIDToTypeID( "Bl  " );

    desc5.putDouble( idB, theB );

    var idRGCl = charIDToTypeID( "RGBC" );

    desc4.putObject( idMnm, idRGCl, desc5 );

    var idMxm = charIDToTypeID( "Mxm " );

    var desc6 = new ActionDescriptor();

    var idR = charIDToTypeID( "Rd  " );

    desc6.putDouble( idR, theR );

    var idG = charIDToTypeID( "Grn " );

    desc6.putDouble( idG, theG );

    var idB = charIDToTypeID( "Bl  " );

    desc6.putDouble( idB, theB );

    var idRGCl = charIDToTypeID( "RGBC" );

    desc4.putObject( idMxm, idRGCl, desc6 );

    var idcolorModel = stringIDToTypeID( "colorModel" );

    desc4.putInteger( idcolorModel, 0 );

    executeAction( idClrR, desc4, DialogModes.NO );

};

////// cut to layer //////

function cutToLayer () {

    try {

// =======================================================

        var idCtTL = charIDToTypeID( "CtTL" );

        executeAction( idCtTL, undefined, DialogModes.NO );

        return activeDocument.activeLayer

    } catch (e) {return undefined}

};

////// create solid color layer //////

function solidColorLayer (theR, theG, theB, theName, theBlendMode) {

// =======================================================

    var idMk = charIDToTypeID( "Mk  " );

    var desc10 = new ActionDescriptor();

    var idnull = charIDToTypeID( "null" );

    var ref1 = new ActionReference();

    var idcontentLayer = stringIDToTypeID( "contentLayer" );

    ref1.putClass( idcontentLayer );

    desc10.putReference( idnull, ref1 );

    var idUsng = charIDToTypeID( "Usng" );

    var desc11 = new ActionDescriptor();

    var idNm = charIDToTypeID( "Nm  " );

    desc11.putString( idNm, theName );

    var idMd = charIDToTypeID( "Md  " );

    var idBlnM = charIDToTypeID( "BlnM" );

    var idMltp = theBlendMode ;

    desc11.putEnumerated( idMd, idBlnM, idMltp );

    var idType = charIDToTypeID( "Type" );

    var desc12 = new ActionDescriptor();

    var idClr = charIDToTypeID( "Clr " );

    var desc13 = new ActionDescriptor();

    var idRd = charIDToTypeID( "Rd  " );

    desc13.putDouble( idRd, theR );

    var idGrn = charIDToTypeID( "Grn " );

    desc13.putDouble( idGrn, theG );

    var idBl = charIDToTypeID( "Bl  " );

    desc13.putDouble( idBl, theB );

    var idRGBC = charIDToTypeID( "RGBC" );

    desc12.putObject( idClr, idRGBC, desc13 );

    var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );

    desc11.putObject( idType, idsolidColorLayer, desc12 );

    var idcontentLayer = stringIDToTypeID( "contentLayer" );

    desc10.putObject( idUsng, idcontentLayer, desc11 );

    executeAction( idMk, desc10, DialogModes.NO );

    return app.activeDocument.activeLayer

};

////// changeSolidColor //////

function changeSolidColorLayer (theR, theG, theB) {

    try {

// =======================================================

        var idsetd = charIDToTypeID( "setd" );

        var desc17 = new ActionDescriptor();

        var idnull = charIDToTypeID( "null" );

        var ref2 = new ActionReference();

        var idcontentLayer = stringIDToTypeID( "contentLayer" );

        var idOrdn = charIDToTypeID( "Ordn" );

        var idTrgt = charIDToTypeID( "Trgt" );

        ref2.putEnumerated( idcontentLayer, idOrdn, idTrgt );

        desc17.putReference( idnull, ref2 );

        var idT = charIDToTypeID( "T   " );

        var desc18 = new ActionDescriptor();

        var idClr = charIDToTypeID( "Clr " );

        var desc19 = new ActionDescriptor();

        var idRd = charIDToTypeID( "Rd  " );

        desc19.putDouble( idRd, theR );

        var idGrn = charIDToTypeID( "Grn " );

        desc19.putDouble( idGrn, theG );

        var idBl = charIDToTypeID( "Bl  " );

        desc19.putDouble( idBl, theB );

        var idRGBC = charIDToTypeID( "RGBC" );

        desc18.putObject( idClr, idRGBC, desc19 );

        var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );

        desc17.putObject( idT, idsolidColorLayer, desc18 );

        executeAction( idsetd, desc17, DialogModes.NO );

        return true

    } catch (e) {return false}

};

////// function to get the date //////

function timeString () {

    var now = new Date();

    return now.getTime()

};

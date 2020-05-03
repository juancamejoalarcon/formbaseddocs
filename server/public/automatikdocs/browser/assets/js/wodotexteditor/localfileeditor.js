/**
 * Copyright (C) 2014 KO GmbH <copyright@kogmbh.com>
 *
 * @licstart
 * This file is part of WebODF.
 *
 * WebODF is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License (GNU AGPL)
 * as published by the Free Software Foundation, either version 3 of
 * the License, or (at your option) any later version.
 *
 * WebODF is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with WebODF.  If not, see <http://www.gnu.org/licenses/>.
 * @licend
 *
 * @source: http://www.webodf.org/
 * @source: https://github.com/kogmbh/WebODF/
 */

/*global document, window, runtime, FileReader, alert, Uint8Array, Blob, saveAs, Wodo*/

function createEditor(formType, idOfContainer) {
    "use strict";

    var editor = null,
        editorOptions,
        loadedFilename;

    /*jslint emptyblock: true*/
    /**
     * @return {undefined}
     */
    function startEditing() {
    }
    /*jslint emptyblock: false*/

    /**
     * extract document url from the url-fragment
     *
     * @return {?string}
     */
    function guessDocUrl() {
        var pos, docUrl = String(document.location);
        // If the URL has a fragment (#...), try to load the file it represents
        // Eliminar esta mierda para que no de problemas
        // pos = docUrl.indexOf('#');
        // if (pos !== -1) {
        //     docUrl = docUrl.substr(pos + 1);
        // } else {
        //     // FILL FORM or CREATE FORM
        //     if (window.DOCUMENTOURL) {
        //         docUrl = window.DOCUMENTOURL;
        //     } else {
        //         docUrl = "welcome.odt";
        //     }
        // }

        // FILL FORM or CREATE FORM
        if (window.DOCUMENTOURL) {
            docUrl = window.DOCUMENTOURL;
        } else {
            docUrl = "assets/js/wodotexteditor/default.odt";
        }
        return docUrl || null;
    }

    function fileSelectHandler(evt) {
        var file, files, reader;
        files = (evt.target && evt.target.files) ||
            (evt.dataTransfer && evt.dataTransfer.files);
        function onLoadEnd() {
            if (reader.readyState === 2) {
                runtime.registerFile(file.name, reader.result);
                loadedFilename = file.name;
                editor.openDocumentFromUrl(loadedFilename, startEditing);
            }
        }
        if (files && files.length === 1) {
            if (!editor.isDocumentModified() ||
                window.confirm("There are unsaved changes to the file. Do you want to discard them?")) {
                editor.closeDocument(function() {
                    file = files[0];
                    reader = new FileReader();
                    reader.onloadend = onLoadEnd;
                    reader.readAsArrayBuffer(file);
                });
            }
        } else {
            alert("File could not be opened in this browser.");
        }
    }

    function enhanceRuntime() {
        var openedFiles = {},
            readFile = runtime.readFile;
        runtime.readFile = function (path, encoding, callback) {
            var array;
            if (openedFiles.hasOwnProperty(path)) {
                array = new Uint8Array(openedFiles[path]);
                callback(undefined, array);
            } else {
                return readFile(path, encoding, callback);
            }
        };
        runtime.registerFile = function (path, data) {
            openedFiles[path] = data;
        };
    }

    function createFileLoadForm() {
        var form = document.createElement("form"),
            input = document.createElement("input");

        function internalHandler(evt) {
            if (input.value !== "") {
                fileSelectHandler(evt);
            }
            // reset to "", so selecting the same file next time still trigger the change handler
            input.value = "";
        }
        form.appendChild(input);
        form.style.display = "none";
        input.id = "fileloader";
        input.setAttribute("type", "file");
        input.addEventListener("change", internalHandler, false);
        document.getElementById('wodoautomatikdocs').appendChild(form);
    }

    function load() {
        var form = document.getElementById("fileloader");
        if (!form) {
            enhanceRuntime();
            createFileLoadForm();
            form = document.getElementById("fileloader");
        }
        form.click();
        
    }

    function save() {
        function saveByteArrayLocally(err, data) {
            if (err) {
                alert(err);
                return;
            }
            // TODO: odfcontainer should have a property mimetype
            var mimetype = "application/vnd.oasis.opendocument.text",
                filename = loadedFilename || "doc.odt",
                blob = new Blob([data.buffer], {type: mimetype});
            saveAs(blob, filename);
            // TODO: hm, saveAs could fail or be cancelled
            editor.setDocumentModified(false);
        }

        editor.getDocumentAsByteArray(saveByteArrayLocally);
    }

    function emptySave() {
        
    }
    // Fill form
    editorOptions = {
        loadCallback: formType === 'fillForm' ? false : load,
        saveCallback: save,
        allFeaturesEnabled: formType === 'fillForm' ? false : true,
        viewOptions: formType === 'fillForm' ? false : true,
        directTextStylingEnabled: formType === 'fillForm' ? false : true,
        directParagraphStylingEnabled: formType === 'fillForm' ? false : true,
        paragraphStyleSelectingEnabled: formType === 'fillForm' ? false : true,
        paragraphStyleEditingEnabled: formType === 'fillForm' ? false : true,
        imageEditingEnabled: formType === 'fillForm' ? false : true,
        hyperlinkEditingEnabled: formType === 'fillForm' ? false : true,
        annotationsEnabled: formType === 'fillForm' ? false : true,
        zoomingEnabled: true,
        reviewModeEnabled: formType === 'fillForm' ? false : true,
        undoRedoEnabled: formType === 'fillForm' ? false : true,
        formType: formType

    };

    function onEditorCreated(err, e) {
        var docUrl = guessDocUrl();
        // console.log(window.DOCUMENTOURL);

        if (err) {
            // something failed unexpectedly
            alert(err);
            return;
        }

        editor = e;
        window.editor = editor;
        editor.setUserData({
            fullName: "WebODF-Curious",
            color:    "black"
        });

        window.addEventListener("beforeunload", function (e) {
            var confirmationMessage = "There are unsaved changes to the file.";

            if (editor.isDocumentModified()) {
                // Gecko + IE
                (e || window.event).returnValue = confirmationMessage;
                // Webkit, Safari, Chrome etc.
                return confirmationMessage;
            }
        });

        if (docUrl) {
            loadedFilename = docUrl;
            editor.openDocumentFromUrl(docUrl, startEditing);
        }

        window.dispatchEvent(new CustomEvent("documentCreated", {}));
    }

    Wodo.createTextEditor(idOfContainer, editorOptions, onEditorCreated);

}

function documentToFitScreen() {
    Wodo.getEditor().setDocumentToFitScreen();
}

function setCursorPositionForDragAndDrop(event) {
    Wodo.getEditor().setCursorPositionForDragAndDrop(event);
}

function closeDocument() {
    Wodo.getEditor().closeDocument(()=>{});
}

function closeAndDestroyEditor() {
    Wodo.getEditor().closeAndDestroyEditor(()=>{});
}


function saveForPreview() {
    function saveByteArrayLocally(err, data) {
        if (err) {
            alert(err);
            return;
        }
        // TODO: odfcontainer should have a property mimetype
        var mimetype = "application/vnd.oasis.opendocument.text",
            // filename = loadedFilename || "doc.odt",
            blob = new Blob([data.buffer], {type: mimetype});
            window.DOCUMENTOPREVIEWURL = URL.createObjectURL(blob);
            window.ODTDOCUMENT = blob;
        // TODO: hm, saveAs could fail or be cancelled
        // Wodo.getEditor().setDocumentModified(false);
    }

    Wodo.getEditor().getDocumentAsByteArray(saveByteArrayLocally);
}

function loadPreview() {
    Wodo.getEditor().openDocumentFromUrl(window.DOCUMENTOPREVIEWURL, startEditing);
}

function removeCursor() {
    Wodo.getEditor().removeCursor();
}

function startEditing() {

}

function getEditorSession() {
    return Wodo.getEditor().getEditorSession();
}

function getEditor() {
    return Wodo.getEditor();
}

module.exports = {
    createEditor: createEditor,
    documentToFitScreen: documentToFitScreen,
    setCursorPositionForDragAndDrop: setCursorPositionForDragAndDrop,
    closeDocument: closeDocument,
    saveForPreview: saveForPreview,
    removeCursor: removeCursor,
    getEditorSession: getEditorSession,
    getEditor: getEditor,
    closeAndDestroyEditor: closeAndDestroyEditor,
    loadPreview: loadPreview
};
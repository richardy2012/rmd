
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Modal from './modal/modal';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/dawn';
import snippetManager from 'brace/mode/snippets';
import Toolbar from './toolbar/toolbar';
import ToolbarItem from './toolbar/toolbar_item';
import style from './editor.less';

export default class Editor extends React.Component {

    static propTypes = {
        isFullScreen: React.PropTypes.bool,
        onScroll: React.PropTypes.func,
        onToggleNav: React.PropTypes.func,
        onToggleFullScreen: React.PropTypes.func,
        onChange: React.PropTypes.func
    };

    static defaultProps = {
        isFullScreen: false,
        onScroll: () => {},
        onToggleNav: () => {},
        onToggleFullScreen: () => {},
        onChange: () => {}
    };

    state = {
        editor: null
    };

    onLoad(editor) {
        const session = editor.getSession();
        session.setUseWrapMode(true);
        session.setNewLineMode('unix');

        const renderer = editor.renderer;
        renderer.setPadding(30);
        renderer.setScrollMargin(30);

        editor.setOption('scrollPastEnd', true);
        editor.commands.addCommand({
            name: 'save',
            bindKey: {
                win: 'Ctrl-S',
                mac: 'Command-S',
                sender: 'editor|cli'
            },
            exec: (env, args, request) => {
                const post = this.props.post;
                this.props.onSave(post);
            }
        });

        this.setState({editor: editor});
    }

    onChange(markdown) {
        this.props.onChange({markdown: markdown});
    }

    onBold() {
        const editor = this.state.editor;
        const replacement = `**${editor.getSelectedText()}**`;
        const range = editor.getSelectionRange();
        editor.getSession().replace(range, replacement);
    }

    onItalic() {
        const editor = this.state.editor;
        const replacement = `*${editor.getSelectedText()}*`;
        const range = editor.getSelectionRange();
        editor.getSession().replace(range, replacement);
    }

    onLink() {
        const editor = this.state.editor;
        const selectedText = editor.getSelectedText() || `text`;
        const range = editor.getSelectionRange();
        editor.getSession().replace(range, `[${selectedText}]()`);
    }

    onImage(){
        const editor = this.state.editor;
        editor.insert(`![]()`);
    }

    onList(){
        const editor = this.state.editor;
        editor.insert(`- `);
    }

    onOrderList(){
        const editor = this.state.editor;
        editor.insert(`1. `);
    }

    onTable(){
        const editor = this.state.editor;
        const table = `|field|field|\n|-----|-----|\n|value|value|`;
        editor.insert(table);
    }

    componentDidUpdate(){
        const renderer = this.state.editor.renderer;
        const padding = this.props.isFullScreen ? ($(window).width() - 800) / 2 : 30;
        renderer.setPadding(padding);
    }
    componentDidMount() {
        // Created by STRd6
        // MIT License
        // jquery.paste_image_reader.js
        (function ($) {
            var defaults;
            $.event.fix = (function (originalFix) {
                return function (event) {
                    event = originalFix.apply(this, arguments);
                    if (event.type.indexOf('copy') === 0 || event.type.indexOf('paste') === 0) {
                        event.clipboardData = event.originalEvent.clipboardData;
                    }
                    return event;
                };
            })($.event.fix);
            defaults = {
                callback: $.noop,
                matchType: /image.*/
            };
            return $.fn.pasteImageReader = function (options) {
                if (typeof options === 'function') {
                    options = {
                        callback: options
                    };
                }
                options = $.extend({}, defaults, options);
                return this.each(function () {
                    var $this, element;
                    element = this;
                    $this = $(this);
                    return $this.bind('paste', function (event) {
                        var clipboardData, found;
                        found = false;
                        clipboardData = event.clipboardData;
                        return Array.prototype.forEach.call(clipboardData.types, function (type, i) {
                            var file, reader;
                            if (found) {
                                return;
                            }
                            if (type.match(options.matchType) || clipboardData.items[i].type.match(options.matchType)) {
                                file = clipboardData.items[i].getAsFile();
                                reader = new FileReader();
                                reader.onload = function (evt) {
                                    return options.callback.call(element, {
                                        dataURL: evt.target.result,
                                        event: evt,
                                        file: file,
                                        name: file.name
                                    });
                                };
                                reader.readAsDataURL(file);
                                return found = true;
                            }
                        });
                    });
                });
            };
        })($);

        function dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {type:mimeString});
        }

        $('html').pasteImageReader((results) => {
            const dataURL = results.dataURL;
            const editor = this.state.editor;

            var blob = dataURItoBlob(dataURL);
            var fd = new FormData();
            fd.append('file', blob);
            $.ajax({
                url: '/api/v1/upload',
                type: 'POST',
                data: fd,
                processData: false,
                contentType: false
            }).then((res) => {
                editor.insert(`![image](${res.data})`);
            });
        });
    }

    render() {

        return (
            <div className={style.editor}>
                <Toolbar isFullScreen={this.props.isFullScreen} >
                    <ToolbarItem icon="bars" onClick={this.props.onToggleNav}/>
                    <ToolbarItem icon="bold" onClick={this.onBold.bind(this)}/>
                    <ToolbarItem icon="italic" onClick={this.onItalic.bind(this)}/>
                    <ToolbarItem icon="link" onClick={this.onLink.bind(this)}/>
                    <ToolbarItem icon="image" onClick={this.onImage.bind(this)}/>
                    <ToolbarItem icon="list" onClick={this.onList.bind(this)}/>
                    <ToolbarItem icon="list-ol" onClick={this.onOrderList.bind(this)}/>
                    <ToolbarItem icon="table" onClick={this.onTable.bind(this)}/>
                    <ToolbarItem icon={this.props.isFullScreen ? 'compress' : 'expand'} align="right" onClick={this.props.onToggleFullScreen}/>
                </Toolbar>
                <div className={style.wrapper} ref="editorWrapper">
                    <AceEditor
                        ref="editor"
                        mode="markdown"
                        theme="dawn"
                        width="100%"
                        height="100%"
                        className={style.ace}
                        showGutter={false}
                        highlightActiveLine={false}
                        showPrintMargin={false}
                        value={this.props.children}
                        onChange={this.onChange.bind(this)}
                        onLoad={this.onLoad.bind(this)}
                        editorProps={{ $blockScrolling: true, animatedScroll: true}}
                    />
                </div>
            </div>
        );
    }
}
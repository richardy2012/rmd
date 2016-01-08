
import React from 'react';
import $ from 'jquery';
import Toolbar from './toolbar/toolbar';
import 'github-markdown-css/github-markdown.css';
import style from './preview.less';
import parser from './parse';

export default class Preview extends React.Component {

    onTitleChange(title) {
        this.props.onTitleChange({title: title});
    }

    componentDidUpdate() {
        // render mathjax
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.refs.preview]);

        // render mermaid
        mermaid.init();
    }

    render() {
        return (
            <div className={`${style.preview}`}>
                <Toolbar
                    markdown={this.props.children}
                    onTitleChange={this.onTitleChange.bind(this)}
                    title={this.props.title}/>
                <div
                    className={`${style['preview-content']} markdown-body`}
                    ref="preview">
                    <div dangerouslySetInnerHTML={{__html: parser(this.props.children.toString())}}></div>
                </div>
            </div>
        );
    }
}
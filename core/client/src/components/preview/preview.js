
import React from 'react';
import $ from 'jquery';
import Toolbar from './toolbar/toolbar';
import 'github-markdown-css/github-markdown.css';
import style from './preview.less';
import parser from './parse';

export default class Preview extends React.Component {

    static propTypes = {
        isFullScreen: React.PropTypes.bool,
        title: React.PropTypes.string,
        onTitleChange: React.PropTypes.func
    };

    static defaultProps = {
        isFullScreen: false,
        title: 'untitled',
        onTitleChange: () => {}
    };

    onTitleChange(title) {
        this.props.onTitleChange({title: title});
    }

    componentDidUpdate() {

        if(!this.props.isFullScreen){
            // render mathjax
            MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.refs.preview]);

            // render mermaid
            mermaid.init();
        }
    }

    render() {
        const html = parser(this.props.children.toString());
        const clazz = this.props.isFullScreen ? style['preview-full-screen'] : style['preview'];

        return (
            <div className={clazz}>
                <Toolbar
                    markdown={this.props.children}
                    onTitleChange={this.onTitleChange.bind(this)}
                    onSave={this.props.onSave}
                    title={this.props.title}
                    user={this.props.user}
                    post={this.props.post}
                    html={html}/>
                <div
                    className={`${style['preview-content']} markdown-body`}
                    ref="preview">
                    <div dangerouslySetInnerHTML={{__html: html}}></div>
                </div>
            </div>
        );
    }
}
import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import Nav from './nav/nav';
import Editor from './editor/editor';
import Preview from './preview/preview';
import style from './app.less';

export default class App extends React.Component {

    state = {
        showNav: false,
        isFullScreen: false
    };

    syncPreviewScroll = _.debounce((scroll) => {
        $(this.refs.preview.refs.preview).stop(true).animate({
            scrollTop: scroll
        }, 100, 'linear');
    }, 50, {maxWait: 50});

    syncEditorScroll(event) {
        const scroll = event.target.scrollTop;
        const $editor = this.refs.editor.refs.editor.editor;
        const session = $editor.getSession();

        session.setScrollTop(scroll);
    };

    onChange(obj) {
        const post = this.props.posts[0];
        this.props.actions.editPost($.extend({}, post, obj));
    }

    onToggleNav() {
        this.setState({showNav: !this.state.showNav});
    }

    onToggleFullScreen() {
        this.setState({isFullScreen: !this.state.isFullScreen});
    }

    componentDidMount() {
        const $preview = $(this.refs.preview.refs.preview);
        const $editorWrapper = $(this.refs.editor.refs.editorWrapper);
        const $editor = this.refs.editor.refs.editor.editor;
        const session = $editor.getSession();

        $editorWrapper.on('mouseover', () => {
            $preview.off('scroll');
            session.on('changeScrollTop', this.syncPreviewScroll);
        });

        $preview.on('mouseover', () => {
            session.off('changeScrollTop', this.syncPreviewScroll);
            $preview.on('scroll', this.syncEditorScroll.bind(this));
        });

        $.get(`/api/v1/post`).then((res) => {
            this.props.actions.initPost(res.data);
        });
    }

    render() {
        const post = this.props.posts[0];
        const user = this.props.user;

        return (
            <div className={style.container}>
                <Nav show={this.state.showNav}/>
                <Editor
                    ref="editor"
                    isFullScreen={this.state.isFullScreen}
                    onScroll={this.syncPreviewScroll.bind(this)}
                    onChange={this.onChange.bind(this)}
                    onToggleNav={this.onToggleNav.bind(this)}
                    onToggleFullScreen={this.onToggleFullScreen.bind(this)}>
                    {post.markdown}
                </Editor>
                <Preview
                    ref="preview"
                    isFullScreen={this.state.isFullScreen}
                    onTitleChange={this.onChange.bind(this)}
                    onSave={this.props.actions.savePost}
                    title={post.title}
                    post={post}
                    user={user}>
                    {post.markdown}
                </Preview>
            </div>
        );
    }
}
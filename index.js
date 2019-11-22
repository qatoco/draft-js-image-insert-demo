import { render } from 'react-dom';
import React, { Component } from 'react';
import { EditorState, ContentState } from 'draft-js';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import { AddImageButton } from 'draft-js-buttons-plugin';
import { BlockquoteButton } from 'draft-js-buttons';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import 'draft-js-side-toolbar-plugin/lib/plugin.css';

const resizeablePlugin = createResizeablePlugin();
const decorator = composeDecorators(resizeablePlugin.decorator);
const imagePlugin = createImagePlugin({ decorator });
const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

class ExampleEditor extends Component {
  state = { editorState: EditorState.createWithContent(ContentState.createFromText('webpack v3, react v15でセットアップ')) };
  render = () => (
    <div>
      <div className="editor">
        <Editor
          editorState={this.state.editorState}
          onChange={editorState => this.setState({ editorState })}
          plugins={[resizeablePlugin, imagePlugin, sideToolbarPlugin]}
        />
        <SideToolbar>
          {externalProps => (
            <div>
              <AddImageButton {...externalProps} />
              <BlockquoteButton {...externalProps} />
            </div>
          )}
        </SideToolbar>
      </div>
    </div>
  );
}

render(<ExampleEditor />, document.getElementById('root'));

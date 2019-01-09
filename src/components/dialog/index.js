import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';
import AppStore from 'AppStore';
import ThemeProvider from 'components/ThemeProvider/index';
const defaultProps = {
  fullScreen: 'false'
};

export function Dialog(
  title = '',
  Component,
  props = defaultProps,
  onCloseCallback = () => {}
) {
  const el = document.createElement('div');
  document.body.appendChild(el);
  const { Content, contentProps } = Component;
  ReactDOM.render(
    <AppStore>
      <ThemeProvider>
        <Modal
          title={title}
          onClose={() => {
            onCloseCallback();
            ReactDOM.unmountComponentAtNode(el);
            document.body.removeChild(el);
          }}
          dialogProps={{
            disablePortal: true,
            //disableAutoFocus: true,
            ...props
          }}
        >
          <Content {...contentProps} />
        </Modal>
      </ThemeProvider>
    </AppStore>,
    el
  );
}

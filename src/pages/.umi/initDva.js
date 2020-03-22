import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'global', ...(require('E:/University/react/reactNative/test/react-h5-demo-/src/models/global.tsx').default) });
app.model({ namespace: 'h5', ...(require('E:/University/react/reactNative/test/react-h5-demo-/src/models/h5.tsx').default) });
app.model({ namespace: 'result', ...(require('E:/University/react/reactNative/test/react-h5-demo-/src/models/result.tsx').default) });
app.model({ namespace: 'weixin', ...(require('E:/University/react/reactNative/test/react-h5-demo-/src/models/weixin.tsx').default) });

import React, { useState } from 'react';
import RGL, { WidthProvider } from '@/components/Draggler';
import _ from 'lodash';
import DragDom from '@/components/DragDom';

const generateDOM = (formInfo, selectId, setSelectId) => {
  // eslint-disable-next-line complexity
  return _.map(formInfo, (l, i) => {
    const nl = JSON.parse(l.cfiLayout);
    return (
      <div key={nl.i} style={{ overflow: 'hidden', border: nl.i === selectId ? '2px solid #03ccff' : '' }} data-grid={nl} onClick={() => setSelectId(nl.i)}>
        <DragDom key={nl.i} data={l} />
      </div>
    );
  });
};

const ReactGridLayout = WidthProvider(RGL);
export default ({ formInfo, setFormInfo, tempData, selectTag, setSelectId, selectId }) => {
  // onDragEnter={() => setDo(true)} fix bug: 拖入一个item还没放置的时候触发onLayoutChange导致页面白板
  const [doing, setDo] = useState(false);

  function onLayoutChange(l) {
    if (doing) return;
    const f = _.map(_.clone(formInfo), v => {
      const item = l.find(lv => lv.i === JSON.parse(v.cfiLayout).i);
      v.cfiLayout = JSON.stringify(item);
      return v;
    });
    setFormInfo(f);
  }

  const onDrop = e => {
    e.i = new Date().getTime() + '';
    tempData.cfiConfigId = selectTag.cfgId;
    const { cfiLayout, cfiType, cfiEvent, cfiName, cfiIsUpdate, cfiConfigId, cfiDatasourceId, cfiId } = tempData;
    const l = _.assign(e, JSON.parse(cfiLayout));
    setSelectId(e.i);
    setFormInfo(formInfo.concat({ cfiId, cfiType, cfiEvent, cfiName, cfiIsUpdate, cfiConfigId, cfiDatasourceId, cfiLayout: JSON.stringify({ ...l }) }));
    setDo(false);
  };

  return (
    // onDragEnter={() => setDo(true)} fix bug: 拖入一个item还没放置的时候触发onLayoutChange导致页面白板
    <div className="manufacturer-grid-box" onDragEnter={() => setDo(true)}>
      <ReactGridLayout
        className="cst-layout"
        cols={12}
        rowHeight={30}
        onLayoutChange={onLayoutChange}
        onDrop={e => onDrop(e)}
        isDroppable={ !!selectTag.cfgId }
      >
        {generateDOM(formInfo, selectId, setSelectId)}
      </ReactGridLayout>
    </div>
  );

};

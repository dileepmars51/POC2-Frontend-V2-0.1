import React, { useState } from "react";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";

import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const TableData = ({
  tableData,
  setTableData,
  setFormData,
  setUpdateItem,
  formId,
  formData,
}) => {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    setActiveId(null);

    const { active, over } = event;

    if (active.id !== over.id) {
      let arrangedArray = [...tableData.formControls];
      const activeIndex = tableData.formControls.indexOf(active.id);
      const overIndex = tableData.formControls.indexOf(over.id);

      arrangedArray = arrayMove(arrangedArray, activeIndex, overIndex);

      setTableData({ ...tableData, formControls: arrangedArray });
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <div className="col-12 bg-light">
          <div className="row p-1">
            <div className="col-12">
              <div className="row bg-light pe-2 tableFixHead">
                <table className="data-table table table-hover">
                  <thead>
                    <tr>
                      <th className="px-1">&nbsp;</th>
                      <th className="px-1">&nbsp;</th>
                      <th className="px-1">Delete</th>

                      <th className="px-1" scope="col">
                        Sequence
                      </th>
                      <th className="px-1" scope="col">
                        Field Name
                      </th>

                      <th className="px-1" scope="col">
                        Field Type
                      </th>
                      <th className="px-1" scope="col">
                        Tooltip
                      </th>
                      <th className="px-1" scope="col">
                        Lesser Than
                      </th>
                      <th className="px-1" scope="col">
                        Equal To
                      </th>
                      <th className="px-1" scope="col">
                        Greater Than
                      </th>
                    </tr>
                  </thead>

                  <tbody className="data-table align-middle">
                    <SortableContext
                      items={tableData.formControls}
                      formData={formData}
                      strategy={verticalListSortingStrategy}
                    >
                      {tableData?.formControls?.length > 0 &&
                        tableData.formControls.map((value, index) => (
                          <SortableItem
                            key={value.caption}
                            id={value}
                            index={index}
                            tableData={tableData}
                            setTableData={setTableData}
                            formId={formId}
                            setUpdateItem={setUpdateItem}
                            setFormData={setFormData}
                          />
                        ))}
                    </SortableContext>

                    <DragOverlay modifiers={[restrictToWindowEdges]}>
                      {activeId ? (
                        <SortableItem value={`Item ${activeId}`} />
                      ) : null}
                    </DragOverlay>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </DndContext>
    </>
  );
};

export default TableData;

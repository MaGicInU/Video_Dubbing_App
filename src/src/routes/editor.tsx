import styles from "./editor.module.css";
import MediaPool from "../components/mediaPool/mediaPool";
import Controls from "../components/controls/controls";
import MediaPlayer from "../components/mediaPlayer/mediaPlayer";
import Actions from "../components/actions/actions";
import Timeline from "../components/timeline/timeline";
import { Media, Segment, SegmentID } from "../model/types";
import { WebGLRenderer } from "../model/webgl";
import Properties from "../components/elements/properties";
import React, { useState } from "react";
import { DragDropContext } from 'react-beautiful-dnd';

export default function Editor(props: {
  canvasRef: HTMLCanvasElement,
  mediaList: Media[],
  setMediaList: (mediaList: Media[]) => void,
  trackList: Segment[][],
  setTrackList: (segments: Segment[][]) => void,
  addVideo: (file: File[]) => void,
  deleteVideo: (media: Media) => void,
  playVideo: () => void,
  pauseVideo: () => void,
  projectWidth: number,
  projectHeight: number,
  renderer: WebGLRenderer,
  projectFramerate: number,
  projectDuration: number,
  isPlaying: boolean,
  currentTime: number,
  setCurrentTime: (timestamp: number) => void,
  dragAndDrop: (media: Media) => void,
  selectedSegment: SegmentID | null,
  setSelectedSegment: (selected: SegmentID | null) => void,
  updateSegment: (id: SegmentID, segment: Segment) => void,
  splitVideo: (timestamp: number) => void,
  deleteSelectedSegment: () => void,
  projectId: string,
  setProjectId: (id: string) => void,
  projectUser: string,
  setProjectUser: (user:string) => void,
  selectedComponent:string,
}) {
  const [scaleFactor, setScaleFactor] = useState<number>(0.1);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // for re-ordering files in the media pool
    if (source.droppableId === destination.droppableId) {
      const items = props.mediaList.slice();
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      props.setMediaList(items);
    }
    else {
      props.dragAndDrop(props.mediaList[result.source.index]);
      const items = props.mediaList.slice();
      props.setMediaList(items);
    }
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className={styles.container}>
        

        <MediaPool
          mediaList={props.mediaList}
          setMediaList={props.setMediaList}
          addVideo={props.addVideo}
          deleteVideo={props.deleteVideo}
          dragAndDrop={props.dragAndDrop}
          projectDuration={props.projectDuration}
          selectedComponent={props.selectedComponent}
          />

        <MediaPlayer
          canvasRef={props.canvasRef}
          projectWidth={props.projectWidth}
          projectHeight={props.projectHeight}
          />
        <Controls
          playVideo={props.playVideo}
          pauseVideo={props.pauseVideo}
          isPlaying={props.isPlaying}
          currentTime={props.currentTime}
          projectDuration={props.projectDuration}
          setCurrentTime={props.setCurrentTime}
          deleteSelectedSegment={props.deleteSelectedSegment}
          splitVideo={props.splitVideo}
          setScaleFactor={setScaleFactor}
          scaleFactor={scaleFactor}
          />
        <Properties
          trackList={props.trackList}
          selectedSegment={props.selectedSegment}
          currentTime={props.currentTime}
          setCurrentTime={props.setCurrentTime}
          updateSegment={props.updateSegment}
        />
        <Timeline
          trackList={props.trackList}
          projectDuration={props.projectDuration}
          selectedSegment={props.selectedSegment}
          setSelectedSegment={props.setSelectedSegment}
          currentTime={props.currentTime}
          setCurrentTime={props.setCurrentTime}
          updateSegment={props.updateSegment}
          scaleFactor={scaleFactor}
          setTrackList={props.setTrackList}
          />
        <Actions
          projectId={props.projectId}
          projectUser={props.projectUser}
          mediaList={props.mediaList}
          trackList={props.trackList}
          setProjectUser={props.setProjectUser}
          />
      </div>
    </DragDropContext>
  );
}

// import styles from "./editor.module.css";
// import MediaPool from "../components/mediaPool/mediaPool";
// import Controls from "../components/controls/controls";
// import MediaPlayer from "../components/mediaPlayer/mediaPlayer";
// import Actions from "../components/actions/actions";
// import Timeline from "../components/timeline/timeline";
// import { Media, Segment, SegmentID } from "../model/types";
          
// import { WebGLRenderer } from "../model/webgl";
// import Properties from "../components/elements/properties";
// import React, { useState } from "react";
// import { DragDropContext } from 'react-beautiful-dnd';
// import { Resplit } from "react-resplit";
// // import SplitPane from "split-pane-react/esm/SplitPane";
// import SplitPane, { Pane } from 'split-pane-react';
// import { ResizableBox } from "react-resizable";
// export default function Editor(props: {
//   canvasRef: HTMLCanvasElement,
//   mediaList: Media[],
//   setMediaList: (mediaList: Media[]) => void,
//   trackList: Segment[][],
//   setTrackList: (segments: Segment[][]) => void,
//   addVideo: (file: File[]) => void,
//   deleteVideo: (media: Media) => void,
//   playVideo: () => void,
//   pauseVideo: () => void,
//   projectWidth: number,
//   projectHeight: number,
//   renderer: WebGLRenderer,
//   projectFramerate: number,
//   projectDuration: number,
//   isPlaying: boolean,
//   currentTime: number,
//   setCurrentTime: (timestamp: number) => void,
//   dragAndDrop: (media: Media) => void,
//   selectedSegment: SegmentID | null,
//   setSelectedSegment: (selected: SegmentID | null) => void,
//   updateSegment: (id: SegmentID, segment: Segment) => void,
//   splitVideo: (timestamp: number) => void,
//   deleteSelectedSegment: () => void,
//   projectId: string,
//   setProjectId: (id: string) => void,
//   projectUser: string,
//   setProjectUser: (user:string) => void,
//   selectedComponent:string;
// }) {
//   const [scaleFactor, setScaleFactor] = useState<number>(0.1);

//   const handleOnDragEnd = (result: any) => {
//     if (!result.destination) return;

//     const { source, destination } = result;

//     // for re-ordering files in the media pool
//     if (source.droppableId === destination.droppableId) {
//       const items = props.mediaList.slice();
//       const [reorderedItem] = items.splice(result.source.index, 1);
//       items.splice(result.destination.index, 0, reorderedItem);
//       props.setMediaList(items);
//     }
//     else {
//       props.dragAndDrop(props.mediaList[result.source.index]);
//       const items = props.mediaList.slice();
//       props.setMediaList(items);
//     }
//   }
//   const [sizes, setSizes] = useState([100, '30%', 'auto']);
//   return (
//     <DragDropContext onDragEnd={handleOnDragEnd}>
//       <div className={styles.container}>
      
//     {/* Your content for the first pane */}
// <SplitPane split="vertical">


//   <div className="split1">
//     <MediaPool
//       mediaList={props.mediaList}
//       setMediaList={props.setMediaList}
//       addVideo={props.addVideo}
//       deleteVideo={props.deleteVideo}
//       dragAndDrop={props.dragAndDrop}
//       projectDuration={props.projectDuration}
//       selectedComponent={props.selectedComponent}
//     />
  
// </div>
// <div className="split2">

//           <MediaPlayer
//             canvasRef={props.canvasRef}
//             projectWidth={props.projectWidth}
//             projectHeight={props.projectHeight}
//           />
//         <Controls
//           playVideo={props.playVideo}
//           pauseVideo={props.pauseVideo}
//           isPlaying={props.isPlaying}
//           currentTime={props.currentTime}
//           projectDuration={props.projectDuration}
//           setCurrentTime={props.setCurrentTime}
//           deleteSelectedSegment={props.deleteSelectedSegment}
//           splitVideo={props.splitVideo}
//           setScaleFactor={setScaleFactor}
//           scaleFactor={scaleFactor}
//           />
//         {/* <Properties
//           trackList={props.trackList}
//           selectedSegment={props.selectedSegment}
//           currentTime={props.currentTime}
//           setCurrentTime={props.setCurrentTime}
//           updateSegment={props.updateSegment}
//         /> */}
//         <Timeline
//           trackList={props.trackList}
//           projectDuration={props.projectDuration}
//           selectedSegment={props.selectedSegment}
//           setSelectedSegment={props.setSelectedSegment}
//           currentTime={props.currentTime}
//           setCurrentTime={props.setCurrentTime}
//           updateSegment={props.updateSegment}
//           scaleFactor={scaleFactor}
//           setTrackList={props.setTrackList}
//         />
//         <Actions
//           projectId={props.projectId}
//           projectUser={props.projectUser}
//           mediaList={props.mediaList}
//           trackList={props.trackList}
//           setProjectUser={props.setProjectUser}
//         />
// </div>
// </SplitPane>
//       </div>
//     </DragDropContext>
//   );
// }

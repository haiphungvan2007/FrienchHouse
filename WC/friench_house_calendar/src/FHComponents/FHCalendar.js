import React, { Component } from 'react';
import Calendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css" 
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'
import "../css/custom_big_calendar.css"

const localizer = Calendar.momentLocalizer(moment)
let allViews = Object.keys(Calendar.Views).map(k => Calendar.Views[k])
const DragAndDropCalendar = withDragAndDrop(Calendar)

class FHCalendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [
        {
          'title': 'My event',
          'allDay': false,
          'start': new Date(2018, 0, 1, 10, 0), // 10.00 AM
          'end': new Date(2018, 0, 1, 14, 0), // 2.00 PM 
        }
      ]
    }

    this.moveEvent = this.moveEvent.bind(this)
    this.newEvent = this.newEvent.bind(this)
  }

  render() {
    return (
      <DragAndDropCalendar
        localizer={localizer}
        events={this.state.events}
        onEventDrop={this.moveEvent}
        resizable
        onEventResize={this.resizeEvent}
        onSelectSlot={this.newEvent}
        step={60}
        views={allViews}        
        date={new Date(2018, 0, 1)}        
        style = {{height:700}}
      />
    );
  }

  moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
    const { events } = this.state

    const idx = events.indexOf(event)
    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }

    const updatedEvent = { ...event, start, end, allDay }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    })

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  }

  resizeEvent = ({ event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })

    //alert(`${event.title} was resized to ${start}-${end}`)
  }

  newEvent(event) {
    // let idList = this.state.events.map(a => a.id)
    // let newId = Math.max(...idList) + 1
    // let hour = {
    //   id: newId,
    //   title: 'New Event',
    //   allDay: event.slots.length == 1,
    //   start: event.start,
    //   end: event.end,
    // }
    // this.setState({
    //   events: this.state.events.concat([hour]),
    // })
  }
}

export default FHCalendar;
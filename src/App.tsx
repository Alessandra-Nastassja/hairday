import './App.css'
import ScheduleList from './components/ScheduleList/scheduleList'
import Sidebar from './components/Sidebar/sidebar'

export default function App() {
  return (
    <main>
      <Sidebar />

      <ScheduleList />
    </main>
  )
}

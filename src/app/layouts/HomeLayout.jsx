import { Outlet } from 'react-router'
import PlayerSection from '@/features/player/pages/PlayerSection.jsx'
import NowPlayingSection from '@/features/now-playing/pages/NowPlayingSection.jsx'
import NavbarSection from '@/features/navbar/pages/NavbarSection.jsx'
import LibrarySection from '@/features/library/pages/LibrarySection.jsx'

function HomeLayout() {
  return (
    <div className="spotify-layout">
      <header className="spotify-layout__navbar">
        <NavbarSection />
      </header>
      <aside className="spotify-layout__library">
        <LibrarySection />
      </aside>
      <main className="spotify-layout__home">
        <Outlet />
      </main>
      <div className="spotify-layout__now-playing">
        <NowPlayingSection />
      </div>
      <div className="spotify-layout__player">
        <PlayerSection />
      </div>
    </div>
  )
}

export default HomeLayout

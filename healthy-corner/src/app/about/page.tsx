import { createClient } from '@/lib/supabase/server'
import AboutContent from '@/components/about/AboutContent'

async function getAboutContent() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('page_slug', 'about-us')
        .eq('is_active', true)

    if (error) return {}

    return data.reduce((acc, curr) => {
        acc[curr.section_key] = curr.content_type === 'json' ? JSON.parse(curr.content) : curr.content
        return acc
    }, {} as any)
}

async function getAchievements() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('is_active', true)
        .order('year', { ascending: false })
        .order('order_index', { ascending: true })

    if (error) return []
    return data
}

export default async function AboutPage() {
    const content = await getAboutContent()
    const achievements = await getAchievements()

    return <AboutContent content={content} achievements={achievements} />
}

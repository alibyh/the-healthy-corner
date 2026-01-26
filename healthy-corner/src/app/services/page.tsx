import { createClient } from '@/lib/supabase/server'
import ServicesContent from '@/components/services/ServicesContent'

async function getServices() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true })

    if (error) {
        console.error('Error fetching services:', error)
        return []
    }
    return data
}

export default async function ServicesPage() {
    const services = await getServices()
    return <ServicesContent services={services} />
}

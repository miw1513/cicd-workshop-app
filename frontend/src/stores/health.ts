import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'checking'
  timestamp: string
  uptime: number
  version: string
  services: {
    backend: boolean
    database: boolean
  }
}

export const useHealthStore = defineStore('health', () => {
  const healthStatus = ref<HealthStatus>({
    status: 'checking',
    timestamp: '',
    uptime: 0,
    version: '1.0.0',
    services: {
      backend: false,
      database: false
    }
  })

  const isHealthy = computed(() => healthStatus.value.status === 'healthy')
  const isChecking = computed(() => healthStatus.value.status === 'checking')

  const checkHealth = async () => {
    try {
      healthStatus.value.status = 'checking'
      
      const response = await fetch('/api/health')
      const data = await response.json()
      
      healthStatus.value = {
        status: response.ok ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        uptime: data.uptime || 0,
        version: data.version || '1.0.0',
        services: {
          backend: data.services?.backend || false,
          database: data.services?.database || false
        }
      }
    } catch (error) {
      console.error('Health check failed:', error)
      healthStatus.value.status = 'unhealthy'
      healthStatus.value.timestamp = new Date().toISOString()
    }
  }

  return {
    healthStatus,
    isHealthy,
    isChecking,
    checkHealth
  }
})
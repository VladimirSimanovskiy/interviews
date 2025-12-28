import type { ConfirmationOptions } from 'primevue/confirmationoptions'
import { useConfirm } from 'primevue/useconfirm'

export function useAppConfirm() {
  const confirm = useConfirm()

  const confirmAsync = (options: ConfirmationOptions): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      let settled = false

      const settle = (value: boolean) => {
        if (settled) return
        settled = true
        resolve(value)
      }

      confirm.require({
        ...options,
        accept: () => settle(true),
        reject: () => settle(false),
        onHide: () => settle(false),
      })
    })
  }

  return { confirmAsync }
}

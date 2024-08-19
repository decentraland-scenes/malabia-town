import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
  
export function setupDonacionOkUi():void {
    ReactEcsRenderer.setUiRenderer(uiDonacionOk)
}
  
const uiDonacionOk = (): ReactEcs.JSX.Element => (
    <UiEntity
        uiTransform={{
            width: '100%',
            height: '100%'
        }}
        uiText={{
            value: "¡Gracias por la donación!",
            textAlign: 'middle-center',
            fontSize: 30
        }}
    />
)

export function setupDonacionErrorUi():void {
    ReactEcsRenderer.setUiRenderer(uiDonacionError)
}
  
const uiDonacionError = (): ReactEcs.JSX.Element => (
    <UiEntity
        uiTransform={{
            width: '100%',
            height: '100%'
        }}
        uiText={{
            value: "¡Error al donar ¿Está conectado MetaMask?",
            textAlign: 'middle-center',
            fontSize: 30
        }}
    />
)
  
export function setupMensajeOkUi():void {
    ReactEcsRenderer.setUiRenderer(uiMensajeOk)
}
  
const uiMensajeOk = (): ReactEcs.JSX.Element => (
    <UiEntity
        uiTransform={{
            width: '100%',
            height: '100%'
        }}
        uiText={{
            value: "¡Mensaje en camino! Aparecerá en unos segundos",
            textAlign: 'middle-center',
            fontSize: 30
        }}
    />
  )

export function setupMensajeErrorUi():void {
    ReactEcsRenderer.setUiRenderer(uiMensajeError)
}
  
const uiMensajeError = (): ReactEcs.JSX.Element => (
    <UiEntity
        uiTransform={{
            width: '100%',
            height: '100%'
        }}
        uiText={{
            value: "Error al enviar mensaje ¿Está conectado MetaMask?",
            textAlign: 'middle-center',
            fontSize: 30
        }}
    />
  )
  
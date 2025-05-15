param location string = resourceGroup().location
param name string = 'game-team-generator-${uniqueString(resourceGroup().id)}'

resource staticWebApp 'Microsoft.Web/staticSites@2022-03-01' = {
  name: name
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  tags: {
    'azd-service-name': 'web'
  }
  properties: {}
}

output staticWebAppName string = staticWebApp.name
output staticWebAppHostname string = staticWebApp.properties.defaultHostname

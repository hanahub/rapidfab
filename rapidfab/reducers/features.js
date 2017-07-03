export default featuresReducer(state, { type, payload }) {
  if (type === BOOTSTAP) {
    return payload.features || [];
  }

  return state || [];
}

export function isFeatureEnabled(features, featureName) {
  const enabledFeatures = features.filter(function(feature){
    return feature if feature.enabled;
  });
  return enabledFeatures;
}

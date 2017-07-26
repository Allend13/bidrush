const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

const generateBemClassNames = (rootObject, obj, prevClass, prevKey) => Object.keys(obj).forEach(key => {
  const parent = rootObject

  if (obj.hasOwnProperty(key)) {
    const nextObj = obj[key]

    if (key !== 'class' && key !== 'modificators') {
      const nextClass = prevClass ? `${prevClass}__${nextObj.class}` : nextObj.class

      if (parent[key]) {
        parent[prevKey + capitalize(key)] = nextClass
      } else {
        parent[key] = nextClass
      }
      generateBemClassNames(parent, nextObj, nextClass, key)
    }

    if (key === 'modificators') {
      nextObj.forEach(modificator => {
        const nextClassModificator = `${prevClass}--${modificator}`
        let modificatorKeyName = capitalize(modificator)

        if (modificator.indexOf('-') !== -1) {
          modificatorKeyName = modificator.split('-').map(str => capitalize(str)).join('')
        }

        if (!parent[prevKey]) parent[prevKey] = {}

        parent[prevKey + modificatorKeyName] = nextClassModificator
      }
      )
    }
  }
})

class BemClassNames {
  extendBEMComponent(extendableComponent, newData) {
    if (extendableComponent && this[extendableComponent] && newData) {
      generateBemClassNames(this[extendableComponent], newData)
    }
  }

  addBEMComponent(component) {
    const componentName = Object.keys(component)[0]

    if (this[componentName]) {
      generateBemClassNames(this[componentName], component)
    } else {
      this[componentName] = {}
      generateBemClassNames(this[componentName], component)
    }
  }
}

const BEM = new BemClassNames()

export default BEM

const targetMap = new WeakMap();
let activeEffect = null // The active effect running

function effect(eff) {
  activeEffect = eff  // Set this as the activeEffect
  activeEffect()      // Run it
  activeEffect = null // Unset it
}

function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, depsMap = new Map())
    }
    let dep = depsMap.get(key)
    if (!dep) {
      dep = new Set()
      depsMap.set(key, dep)
    }
    dep.add(activeEffect)
  }
}


function trigger(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) return

  let dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}


function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      track(target, key)
      return Reflect.get(target, key, receiver)
    },


    set(target, key, value, receiver) {
      let oldValue = target[key]
      let newValue = Reflect.set(target, key, value, receiver)

      if (newValue && oldValue != value) {
        trigger(target, key)
      }

      return newValue

    }
  }

  return new Proxy(target, handler)
}


function ref(raw) {
  const r = {
    get value() {
      track(r, 'value')
      return raw
    },
    set value(newVal) {
      raw = newVal
      trigger(r, 'value')
    },
  }
  return r
}

function computed(computeAction) {
  let result = ref()

  effect(() => {
    result.value = computeAction()
  })

  return result
}





const product = reactive({ price: 5, quantity: 2, size: 5 })


let salePrice = computed(() => {
  return product.price * 0.9
})

let total = computed(() => {
  return salePrice.value * product.quantity
})


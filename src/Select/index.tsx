import { useEffect, useRef, useState } from 'react'
import style from './style.module.css'

interface SelectProps<T> {
    items: T[];
    label: (item: T) => string;
    value?: T
    onChange: (item: T) => void
    // valueExtractor?: (item: T) => U
}
  
function Select<T>(props: SelectProps<T>) {

    const optionRefs = useRef<HTMLLIElement[]>([])
    const selectRef = useRef<HTMLDivElement>(null)

    const [showOptions, setShowOptions] = useState(false)

    const [search, setSearch] = useState('')

    useEffect(() => {

        const reset = setTimeout(() => setSearch(''), 500)

        if (search) {
            const foundItem = props.items.find(item => {
                const label = props.label(item).toLowerCase()
                return label.startsWith(search.toLowerCase())
            })
            
            if (foundItem) handleChange(foundItem)
        }
        
        return () => clearTimeout(reset)

    }, [search])

    useEffect(() => {
        if(selectRef.current)
            selectRef.current.tabIndex = 0
    }, [])

    function handleChange(item: T) {
        const index = props.items.indexOf(item)
        optionRefs.current[index].scrollIntoView({ block: 'nearest' })
        props.onChange(item)
    }

    function handleSelect(item: T) {
        setShowOptions(false)
        handleChange(item)
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        
        switch (e.code) {
            
            case 'Space': {
                setShowOptions(!showOptions)
                break
            }
            case 'Escape':
            case 'Enter': {
                setShowOptions(false)
                break
            }
            case 'ArrowUp':
            case 'ArrowDown': {
                const nextIndex = props.value ? props.items.indexOf(props.value) + (e.code == 'ArrowDown' ? 1 : -1) : 0
                if (nextIndex >= 0 && nextIndex < props.items.length)
                    handleChange(props.items[nextIndex])
                break
            }
            default: {
                setSearch(search => search + e.key)
            }
        }
    }

    return (
        <div
            className={style.container}
            ref={selectRef}
            onBlur={() => setShowOptions(false)}
            onKeyDown={handleKeyDown}
        >
            {props.value ?
                <span className={style.label} onClick={() => setShowOptions(!showOptions)}>{props.label(props.value)}</span>
                :
                <span className={style.label} onClick={() => setShowOptions(!showOptions)}>&nbsp;&nbsp;</span>
            }
                
            <ul className={`${style.options} ${showOptions ? style.show : ''}`}>
                {props.items.map((item, i) =>
                    <li
                        className={`${style.option} ${props.value === item ? style.selected : ''}`}
                        onClick={() => handleSelect(item)}
                        ref={ref => { if (ref) optionRefs.current[i] = ref }}
                    >
                        {props.label(item)}
                    </li>
                )}
            </ul>
        </div>
    )
}
  
export default Select
  
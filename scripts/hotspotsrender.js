// Функция создания маскота
function createMascot(position, align, mascotPosition) {
    const mascot = document.createElement('img');
    mascot.className = 'tooltip-mascot';
    
    // Определяем позицию маскота и выбираем изображение
    let mascotClass = '';
    let mascotSrc = '';
    
    // Определяем оптимальную позицию маскота на основе позиции тултипа
    let optimalMascotPosition = mascotPosition;
    
    if (!optimalMascotPosition) {
        // Автоматически определяем лучшую позицию для маскота
        if (position === 'right') {
            optimalMascotPosition = 'left'; // Маскот слева от тултипа
        } else if (position === 'left') {
            optimalMascotPosition = 'right'; // Маскот справа от тултипа
        } else if (position === 'top') {
            optimalMascotPosition = 'left'; // Маскот слева от тултипа
        } else if (position === 'bottom') {
            optimalMascotPosition = 'left'; // Маскот слева от тултипа
        }
    }
    
    // Выбираем изображение и класс в зависимости от позиции
    if (optimalMascotPosition === 'left') {
        mascotClass = 'tooltip-mascot-left';
        mascotSrc = 'assets/icons/mascotRight.svg'; // Смотрит вправо (к тултипу)
    } else if (optimalMascotPosition === 'right') {
        mascotClass = 'tooltip-mascot-right';
        mascotSrc = 'assets/icons/mascotLeft.svg'; // Смотрит влево (к тултипу)
    }
    
    mascot.classList.add(mascotClass);
    mascot.src = mascotSrc;
    mascot.alt = 'Mascot';
    mascot.dataset.position = optimalMascotPosition;
    
    // Функция для анимации маскота при изменении позиции
    mascot.animateTo = function(newPosition, newAlign, newMascotPosition) {
        mascot.classList.add('tooltip-mascot-animating');
        setTimeout(() => {
            // Обновляем позицию и изображение
            const newOptimalPosition = newMascotPosition || 
                (newPosition === 'right' ? 'left' : 
                 newPosition === 'left' ? 'right' : 'left');
            
            mascot.className = 'tooltip-mascot';
            if (newOptimalPosition === 'left') {
                mascot.classList.add('tooltip-mascot-left');
                mascot.src = 'assets/icons/mascotRight.svg';
            } else {
                mascot.classList.add('tooltip-mascot-right');
                mascot.src = 'assets/icons/mascotLeft.svg';
            }
            mascot.dataset.position = newOptimalPosition;
            
            setTimeout(() => {
                mascot.classList.remove('tooltip-mascot-animating');
            }, 350);
        }, 200);
    };
    
    return mascot;
}

function addHotspot(hs) {
    const container = document.querySelector('.hotspot-container');
    const imageWrapper = document.querySelector('.image-wrapper');
    const hotspotDiv = document.createElement('div');
    hotspotDiv.className = 'hotspot';
    hotspotDiv.style.pointerEvents = 'auto';
    hotspotDiv.style.left = hs.xPercent + "%";
    hotspotDiv.style.top = hs.yPercent + "%";
    hotspotDiv.style.width = hs.width + "%";
    hotspotDiv.style.height = hs.height + "%";

    // ...existing code...

    const position = hs.tooltipPosition || 'top';
    const align = hs.tooltipAlign || 'center';
    const text = hs.tooltipText || 'Tooltip';

    // Создаем тултип как отдельный элемент вне контейнера хотспотов
    const tooltip = document.createElement('div');
    tooltip.className = `tooltip tooltip-${position} tooltip-${position}-${align}`;
    tooltip.innerHTML = text;
    tooltip.dataset.position = position;
    tooltip.dataset.align = align;
    tooltip.style.position = 'fixed';
    tooltip.style.zIndex = '100';

    // ...existing code для построения tooltipContent...

    let arrowClass = '';
    if (position === 'top') {
        if (align === 'start') arrowClass = 'tooltip-arrow-bottom-left';
        else if (align === 'end') arrowClass = 'tooltip-arrow-bottom-right';
        else arrowClass = 'tooltip-arrow-bottom-center';
    } else if (position === 'bottom') {
        if (align === 'start') arrowClass = 'tooltip-arrow-top-left';
        else if (align === 'end') arrowClass = 'tooltip-arrow-top-right';
        else arrowClass = 'tooltip-arrow-top-center';
    } else if (position === 'left') {
        if (align === 'start') arrowClass = 'tooltip-arrow-right-top';
        else if (align === 'end') arrowClass = 'tooltip-arrow-right-bottom';
        else arrowClass = 'tooltip-arrow-right-center';
    } else if (position === 'right') {
        if (align === 'start') arrowClass = 'tooltip-arrow-left-top';
        else if (align === 'end') arrowClass = 'tooltip-arrow-left-bottom';
        else arrowClass = 'tooltip-arrow-left-center';
    }

    let tooltipContent = '';
    const titleHtml = hs.tooltipTitle ? `<div class="tooltip-title">${hs.tooltipTitle}</div>` : '';
    
    let buttonText = '';
    if (hs.invisible === true) {
        buttonText = currentStep < currentScenario.totalSteps  ? 'Далее' : 'Завершить';
    }
    const buttonAction = 'nextStep()';
    
    const showArrow = hs.invisible !== true;
    const arrowHtml = showArrow ? `<div class="tooltip-arrow ${arrowClass}"></div>` : '';
    
    if (position === 'top') {
        tooltipContent = `
            ${arrowHtml}
            <div class="tooltip-inner">
                ${titleHtml}
                <p>${hs.tooltipText || 'Tooltip'}</p>
                <div class="tooltip-actions">
                    <button class="prev" onclick="prevStep()">Назад</button>
                    ${hs.invisible === true ? `<button class="next" onclick="${buttonAction}">${buttonText}</button>` : ''}
                </div>
            </div>
        `;
    } else if (position === 'bottom') {
        tooltipContent = `
            <div class="tooltip-inner">
                ${titleHtml}
                <p>${hs.tooltipText || 'Tooltip'}</p>
                <div class="tooltip-actions">
                    <button class="prev" onclick="prevStep()">Назад</button>
                    ${hs.invisible === true ? `<button class="next" onclick="${buttonAction}">${buttonText}</button>` : ''}
                </div>
            </div>
            ${arrowHtml}
        `;
    } else if (position === 'left') {
        tooltipContent = `
            ${arrowHtml}
            <div class="tooltip-inner">
                ${titleHtml}
                <p>${hs.tooltipText || 'Tooltip'}</p>
                <div class="tooltip-actions">
                    <button class="prev" onclick="prevStep()">Назад</button>
                    ${hs.invisible === true ? `<button class="next" onclick="${buttonAction}">${buttonText}</button>` : ''}
                </div>
            </div>
        `;
    } else if (position === 'right') {
        tooltipContent = `
            <div class="tooltip-inner">
                ${titleHtml}
                <p>${hs.tooltipText || 'Tooltip'}</p>
                <div class="tooltip-actions">
                    <button class="prev" onclick="prevStep()">Назад</button>
                    ${hs.invisible === true ? `<button class="next" onclick="${buttonAction}">${buttonText}</button>` : ''}
                </div>
            </div>
            ${arrowHtml}
        `;
    } else {
        tooltipContent = `
            <div class="tooltip-inner">
                ${titleHtml}
                <p>${hs.tooltipText || 'Tooltip'}</p>
                <div class="tooltip-actions">
                    <button class="prev" onclick="prevStep()">Назад</button>
                    ${hs.invisible === true ? `<button class="next" onclick="${buttonAction}">${buttonText}</button>` : ''}
                </div>
            </div>
        `;
    }

    if(hs.invisible === false) {
        hotspotDiv.addEventListener('click', function(e) {
            if (e.target === hotspotDiv) {
                nextStep();
            }
        });
    }

    if (hs.invisible === true) {
        hotspotDiv.style.background = 'transparent';
        hotspotDiv.style.border = 'none';
        hotspotDiv.style.boxShadow = 'none';
        hotspotDiv.style.animation = 'none';
    }

    tooltip.innerHTML = tooltipContent;
    
    // Добавляем маскота рядом с тултипом (если не отключен)
    if (hs.showMascot !== false) {
        const mascot = createMascot(position, align, hs.mascotPosition);
        if (mascot) {
            tooltip.appendChild(mascot);
            setTimeout(() => {
                mascot.classList.add('mascot-show');
            }, 50);
        }
    }
    
    // Добавляем тултип в body, а не в хотспот
    document.body.appendChild(tooltip);

    // Функция для позиционирования tooltip
    function positionTooltip(hsArg = hs, positionArg = position, alignArg = align) {
        requestAnimationFrame(() => {
            const ttRect = tooltip.getBoundingClientRect();
            const hsRect = hotspotDiv.getBoundingClientRect();

            let left = hsRect.left;
            let top = hsRect.top;
            const gap = 8;
            
            // TOP
            if (positionArg === 'top') {
                if (alignArg === 'start') {
                    left = hsRect.left;
                } else if (alignArg === 'end') {
                    left = hsRect.right - ttRect.width;
                } else {
                    left = hsRect.left + (hsRect.width - ttRect.width) / 2;
                }
                top = hsRect.top - ttRect.height - gap;
            }
            // BOTTOM
            else if (positionArg === 'bottom') {
                if (alignArg === 'start') {
                    left = hsRect.left;
                } else if (alignArg === 'end') {
                    left = hsRect.right - ttRect.width;
                } else {
                    left = hsRect.left + (hsRect.width - ttRect.width) / 2;
                }
                top = hsRect.bottom + gap;
            }
            // LEFT
            else if (positionArg === 'left') {
                left = hsRect.left - ttRect.width - gap;
                if (alignArg === 'start') {
                    top = hsRect.top;
                } else if (alignArg === 'end') {
                    top = hsRect.bottom - ttRect.height;
                } else {
                    top = hsRect.top + (hsRect.height - ttRect.height) / 2;
                }
            }
            // RIGHT
            else if (positionArg === 'right') {
                left = hsRect.right + gap;
                if (alignArg === 'start') {
                    top = hsRect.top;
                } else if (alignArg === 'end') {
                    top = hsRect.bottom - ttRect.height;
                } else {
                    top = hsRect.top + (hsRect.height - ttRect.height) / 2;
                }
            }
            
            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
        });
    }

    tooltip.classList.add('tooltip-show');
    setTimeout(positionTooltip, 0);
    window.addEventListener('resize', positionTooltip);
    
    hotspotDiv._removeTooltipResize = () => {
        window.removeEventListener('resize', positionTooltip);
        tooltip.remove();
    };

    container.appendChild(hotspotDiv);
}


function updateHotspotPositions() {
    const stepImg = document.getElementById('step-img');
    const imageWrapper = document.querySelector('.image-wrapper');
    const hotspotContainer = document.querySelector('.hotspot-container');
    
    if (!stepImg || !imageWrapper || !hotspotContainer) return;
    
    // Получаем реальные размеры изображения
    const imgRect = stepImg.getBoundingClientRect();
    const wrapperRect = imageWrapper.getBoundingClientRect();
    
    // Вычисляем смещение изображения относительно контейнера
    const offsetX = imgRect.left - wrapperRect.left;
    const offsetY = imgRect.top - wrapperRect.top;
    
    // Масштаб изображения
    const scaleX = imgRect.width / stepImg.naturalWidth;
    const scaleY = imgRect.height / stepImg.naturalHeight;
    
    // Применяем трансформацию к контейнеру хотспотов
    hotspotContainer.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scaleX}, ${scaleY})`;
    hotspotContainer.style.transformOrigin = '0 0';
    hotspotContainer.style.width = `${stepImg.naturalWidth}px`;
    hotspotContainer.style.height = `${stepImg.naturalHeight}px`;
}
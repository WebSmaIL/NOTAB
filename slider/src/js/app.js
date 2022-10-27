function newSlider() {
    const sliderArrows = document.querySelectorAll(".slider__arrow"),
        sliderItems = document.querySelectorAll(".slider__item"),
        dotsContainer = document.querySelector(".slider__dots");

    const options = {
        width: document.getElementById("slider").clientWidth,
        itemsCount: sliderItems.length,
        currentItem: 0,
        isAnimate: false,
        toggleAnimate: function () {
            this.isAnimate = !this.isAnimate;
        },
    };

    const setItemsPosition = (direction) => {
        return sliderItems.forEach((item) => {
            item !== sliderItems[options.currentItem]
                ? (item.style.cssText = `${direction}: -${options.width}px`)
                : (item.style.cssText = `${direction}: 0`);
        });
    };

    const animate = (item1, item2, position1, position2, direction) => {
        const getValue = (item, direction) => {
            let value =
                direction === "left" ? item.style.left : item.style.right;
            return Number(value.split("px")[0]);
        };
    
        const updatePos = (items, values, dir) => {
            let calc;
            for (let i = 0; i < items.length; i++) {
                calc = values[i] + options.width / 10 + "px";
    
                if (dir === "left") {
                    items[i].style.left = calc;
                } else {
                    items[i].style.right = calc;
                }
            }
            return 0;
        };

        options.toggleAnimate();
        setItemsPosition(direction);

        let animation = setInterval(() => {
            let value1 = getValue(item1, direction);
            let value2 = getValue(item2, direction);

            if (value1 >= position1 && value2 >= position2) {
                clearInterval(animation);
                options.toggleAnimate();
                return;
            }
            updatePos([item1, item2], [value1, value2], direction);
        }, 10);
    };

    const getDots = () => {
        let dotsStr = "";
        for (let i = 0; i < sliderItems.length; i++)
            dotsStr += "<button class='slider__dot'></button>";
        return dotsStr;
    };

    const dotsToggleClass = (curItem, prevItem) => {
        dots[curItem].classList.add("active");
        dots[prevItem].classList.remove("active");
        return 0;
    };

    const arrowsCallback = (item) => {
        const setCurItem = (prevItem, direction) => {
            if (direction === "left")
                return prevItem === 0 ? options.itemsCount - 1 : prevItem - 1;
            if (direction === "right")
                return prevItem === options.itemsCount - 1 ? 0 : prevItem + 1;
        };
        const prevItem = options.currentItem;
        const curItem = setCurItem(prevItem, item.id);

        dotsToggleClass(curItem, prevItem);
        animate(
            sliderItems[prevItem],
            sliderItems[curItem],
            options.width,
            0,
            item.id
        );
        options.currentItem = curItem;
    };

    const dotsCallback = (dot) => {
        const setDirection = (currentItem, prevItem) => {
            if (prevItem < currentItem) return "right";
            if (prevItem > currentItem) return "left";
            return null;
        };
        const curItem = Array.prototype.indexOf.call(dots, dot);
        const prevItem = options.currentItem;
        const direction = setDirection(curItem, prevItem);
        if (!direction) return;

        dotsToggleClass(curItem, prevItem);
        animate(
            sliderItems[prevItem],
            sliderItems[curItem],
            options.width,
            0,
            direction
        );
        options.currentItem = curItem;
    };

    dotsContainer.innerHTML = getDots();
    const dots = document.querySelectorAll(".slider__dot");
    dots[options.currentItem].classList.add("active");

    setItemsPosition("left");
    sliderArrows.forEach((arrow) =>
        arrow.addEventListener("click", (e) =>
            !options.isAnimate ? arrowsCallback(arrow) : null
        )
    );
    dots.forEach((dot) =>
        dot.addEventListener("click", (e) =>
            !options.isAnimate ? dotsCallback(dot) : null
        )
    );
}
newSlider();

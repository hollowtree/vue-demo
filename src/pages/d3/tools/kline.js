import { path } from "d3-path";
import constant from "./constant";
import curveLinear from "./curve/linear";
import { x as pointX, y as pointY } from "./point";

export default function () {
    var x = pointX,
        l = pointX,
        y = pointY,
        y1 = pointY,
        y2 = pointY,
        y3 = pointY,
        isDraw = pointX,
        defined = constant(true),
        context = null,
        curve = curveLinear,
        output = null;

    function line(data) {
        var i,
            n = data.length,
            d,
            defined0 = false,
            buffer;

        if (context == null) output = curve(buffer = path());

        for (i = 0; i <= n; ++i) {
            if (!(i < n && defined(d = data[i], i, data)) === defined0) {
                if (defined0 = !defined0) output.lineStart();
                else output.lineEnd();
            }
            if (isDraw(d)) {
                if (defined0) output.move(+x(d, i, data) - l(), +y(d));
                if (defined0) output.point(+x(d, i, data) - l(), +y1(d));
                if (defined0) output.point(+x(d, i, data) + l(), +y1(d));
                if (defined0) output.point(+x(d, i, data) + l(), +y(d));
                if (defined0) output.point(+x(d, i, data) - l(), +y(d));

                if (defined0) output.move(+x(d, i, data), +y2(d));
                if (defined0) output.point(+x(d, i, data), +y3(d));
            }
        }
        if (buffer) return output = null, buffer + "" || null;
    }

    line.isDraw = function (_) {
        return arguments.length ? (isDraw = typeof _ === "function" ? _ : constant(+_), line) : isDraw;
    };
    line.l = function (_) {
        return arguments.length ? (l = typeof _ === "function" ? _ : constant(+_), line) : l;
    };

    line.x = function (_) {
        return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), line) : x;
    };

    line.y = function (_) {
        return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), line) : y;
    };

    line.y1 = function (_) {
        return arguments.length ? (y1 = typeof _ === "function" ? _ : constant(+_), line) : y1;
    };
    line.y2 = function (_) {
        return arguments.length ? (y2 = typeof _ === "function" ? _ : constant(+_), line) : y2;
    };
    line.y3 = function (_) {
        return arguments.length ? (y3 = typeof _ === "function" ? _ : constant(+_), line) : y3;
    };

    line.defined = function (_) {
        return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
    };

    line.curve = function (_) {
        return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
    };

    line.context = function (_) {
        return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
    };
    return line;
}

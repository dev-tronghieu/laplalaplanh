import * as mqttService from "@/services/mqtt";

const SayHello = () => {
    const handleSayHello = () => {
        mqttService.publish(
            mqttService.LLLL_CHANNEL.HELLO,
            "Say hello from LLLL client!"
        );
    };

    return (
        <button className="btn" onClick={handleSayHello}>
            Say hello
        </button>
    );
};

export default SayHello;

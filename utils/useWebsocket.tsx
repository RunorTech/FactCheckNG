/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { io, Socket } from 'socket.io-client';

interface WsContextValueProps {
  socket: Socket | null;
}

const WsContext = createContext<WsContextValueProps>({
  socket: null,
});

type WatchParams = { [key: string]: string | number };

export interface UseWebsocketParamsProps {
  subEvent?: string | string[];
  pubEvent?: string | string[];
  watchParams?: WatchParams;
}

export interface WebSocketBaseDataProps {
  businessId: number;
  [_: string]: string | number | boolean;
}

export type WebSocketDataProps<EventResponse extends object> =
  WebSocketBaseDataProps & EventResponse;

export interface UseWebsocketReturnProps<EventResponse extends object> {
  data: WebSocketDataProps<EventResponse> | null;
  emitEvent: (pubData: string) => void;
}

export function useWebsocket<EventResponse extends object>({
  subEvent,
  pubEvent,
  watchParams,
}: UseWebsocketParamsProps): UseWebsocketReturnProps<EventResponse> {
  const { socket } = useContext(WsContext);
  const [data, setData] = useState<WebSocketDataProps<EventResponse> | null>(
    null,
  );


  const emitEvent = useCallback(
    (pubData: string) => {
      if (Array.isArray(pubEvent)) {
        pubEvent.forEach((event) => {
          socket?.emit(event, pubData);
        });
      } else {
        socket?.emit(pubEvent as string, pubData);
      }
    },
    [socket, pubEvent],
  );

  useEffect(() => {
    const handleSocketEvent =
      (event: string) => (resp: WebSocketDataProps<EventResponse>) => {
        const canSetData = watchParams
          ? Object.keys(watchParams).reduce((acc, param) => {
            if (!acc) return acc;
            if (resp[param]) {
              return resp[param] === watchParams[param];
            }

            return acc;
          }, true)
          : true;

        if (canSetData) {
          setData({ event, ...resp });
        }
      };

    if (Array.isArray(subEvent)) {
      subEvent.forEach((event) => {
        socket?.on(event, handleSocketEvent(event));
      });

      return () => {
        subEvent.forEach((event) => {
          socket?.removeAllListeners(event);
        });
      };
    } else if (subEvent) {
      socket?.on(subEvent, handleSocketEvent(subEvent));

      return () => {
        socket?.removeAllListeners(subEvent);
      };
    }

    return () => { };
  }, [socket, subEvent, watchParams]);

  return { data, emitEvent };
}

export function WsProvider({ children }: { children: React.ReactNode }) {
  const socket = useMemo(() => {
    return io("", {
      path: "/socket.io", // match server path
      transports: ["websocket", "polling"],
    });
  }, []);
  useEffect(() => {
    socket.on('connection', () => {
      console.info(': WS connected');
    });
    socket.on('disconnect', () => {
      console.info(': WS disconnected');
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  return <WsContext.Provider value={{ socket }}>{children}</WsContext.Provider>;
}
